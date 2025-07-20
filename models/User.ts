import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "editor", "contributor"], default: "contributor" },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.User || mongoose.model("User", UserSchema) 