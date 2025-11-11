import { Schema, model, models } from "mongoose"

export interface DocumentationType {
  _id: string
  title: string
  content: string
  author: string
  category: string
  createdAt?: Date
  image?: string
  pdfUrl?: string
  video?: string
}

const DocumentationSchema = new Schema<DocumentationType>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
  image: String,
  pdfUrl: String,
  video: String,
})

export default models.Documentation || model<DocumentationType>("Documentation", DocumentationSchema)
