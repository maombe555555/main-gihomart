import { Schema, model, models } from "mongoose"

export interface AdType {
  _id: string
  title: string
  videoUrl: string
  isActive: boolean
  placement: "home" | "other"
  createdAt?: Date
}

const AdSchema = new Schema<AdType>({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  placement: { type: String, enum: ["home", "other"], default: "home" },
  createdAt: { type: Date, default: Date.now },
})

export default models.Ad || model<AdType>("Ad", AdSchema)
