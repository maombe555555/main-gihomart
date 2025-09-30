import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false, // never return password by default
  },
  role: {
    type: String,
    enum: ["admin", "editor", "contributor"],
    default: "contributor",
  },
  createdAt: { type: Date, default: Date.now },
})

// Hash password before save if modified
UserSchema.pre("save", async function (next) {
  const user = this as mongoose.Document & { password: string; isModified: (p: string) => boolean }
  if (!user.isModified("password")) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    next()
  } catch (err) {
    next(err as any)
  }
})

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidate: string) {
  const user = this as { password: string }
  return bcrypt.compare(candidate, user.password)
}

export default (mongoose.models.User as mongoose.Model<any>) || mongoose.model("User", UserSchema)