import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";

export const registerUser = async (req, res) => {
  const { name, email, password, village, preferredLanguage } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      village,
      preferredLanguage,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        village: newUser.village,
        preferredLanguage: newUser.preferredLanguage,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error during signup:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      generateToken(user._id, res);
      res.status(200).json({
        _id: user._id,
        name: user.name,
          email: user.email,
          village: user.village,
          preferredLanguage: user.preferredLanguage,
      });
    } catch (error) {
      console.log("Error during login:", error);
      res.status(500).json({ error: "Server error" });
    }
};


export const logoutUser = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
