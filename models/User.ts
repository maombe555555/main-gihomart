import mongoose, { Schema, Document, Model } from "mongoose"

export interface IUser extends Document {
  email: string
  password: string
  role: "admin" | "editor" | "contributor"
  createdAt: Date
}

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "editor", "contributor"], default: "contributor" },
  createdAt: { type: Date, default: Date.now },
})

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User
