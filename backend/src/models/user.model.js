import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  village: String,
  preferredLanguage: { type: String, default: "hi" },
});

const User = mongoose.model("User", userSchema);

export default User;
