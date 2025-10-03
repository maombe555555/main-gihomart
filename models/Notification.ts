import mongoose, { Schema, Document } from "mongoose"

export interface INotification extends Document {
  message: string
  type: string
}

const NotificationSchema = new Schema(
  {
    message: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema)
