import mongoose, { Schema, Document } from "mongoose"

export interface IDoc extends Document {
  title: string
  content: string
  createdAt: Date
}

const DocSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.models.Doc || mongoose.model<IDoc>("Doc", DocSchema)
