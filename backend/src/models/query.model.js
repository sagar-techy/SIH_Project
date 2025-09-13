import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  farmerId: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Query = mongoose.model("Query", querySchema);
export default Query;
