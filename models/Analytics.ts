import mongoose, { Schema, Document, Model } from "mongoose"

interface IAnalytics extends Document {
  pageViews: number
  userCount: number
  timestamp: Date
}

const AnalyticsSchema: Schema<IAnalytics> = new Schema({
  pageViews: { type: Number, required: true },
  userCount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
})

const Analytics: Model<IAnalytics> =
  mongoose.models.Analytics || mongoose.model<IAnalytics>("Analytics", AnalyticsSchema)

export default Analytics
