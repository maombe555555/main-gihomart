import mongoose from "mongoose"

const DocumentationSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  video: String,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Documentation || mongoose.model("Documentation", DocumentationSchema) 