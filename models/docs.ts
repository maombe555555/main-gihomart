import mongoose from "mongoose"

const DocumentationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    pdfUrl: { type: String }, // optional
    image: { type: String },  // optional, if you plan to support images later
    video: { type: String },  // optional, if you plan to support videos later
  },
  { timestamps: true }
)

export default mongoose.models.Documentation || mongoose.model("Documentation", DocumentationSchema)
