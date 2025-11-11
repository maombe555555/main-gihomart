// models/Ad.ts
import mongoose, { Schema, models, model } from "mongoose"

const AdSchema = new Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    placement: { type: String, enum: ["home", "other"], default: "home" },
  },
  { timestamps: true }
)

const Ad = models.Ad || model("Ad", AdSchema)
export default Ad
