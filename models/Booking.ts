import mongoose from "mongoose"

const BookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: { type: String, required: true, trim: true },
  destination: { type: String, trim: true },
  departureDate: { type: Date },
  returnDate: { type: Date },
  travelers: { type: Number, default: 1, min: 1 },
  budget: { type: String, trim: true },
  comments: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema)


