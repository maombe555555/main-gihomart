// models/Admin.ts
import mongoose, { Schema, Document } from "mongoose"

export interface IAdmin extends Document {
  email: string
  password: string // hashed password recommended
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema)
