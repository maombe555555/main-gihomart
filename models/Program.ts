import mongoose from "mongoose"

const ProgramSchema = new mongoose.Schema({
  name: String,
  description: String,
  schedule: String,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Program || mongoose.model("Program", ProgramSchema) 