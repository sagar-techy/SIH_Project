import mongoose from "mongoose";


const knowledgeSchema = new mongoose.Schema({
  title: String,
  content: String,
  embeddings: [Number], 
});

const Knowledge = mongoose.model("Knowledge", knowledgeSchema);

export default Knowledge;