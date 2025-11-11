import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
  email: string
  password: string // hashed with bcrypt ideally
  role: "admin" | "editor" | "contributor"
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor", "contributor"], required: true },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
