require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gihomart';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});
const Product = mongoose.model('Product', productSchema);

// Booking Model
const Booking = require('./Booking');

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Get all products
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add a product
app.post('/api/products', async (req, res) => {
  const { name, price, description } = req.body;
  const product = new Product({ name, price, description });
  await product.save();
  res.status(201).json(product);
});


// Get all bookings
app.get('/api/bookings', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// Add a booking
app.post('/api/bookings', async (req, res) => {
  const { firstName, lastName, email, phone, departureDate, returnDate, travelers, budget, comments } = req.body;
  const booking = new Booking({ firstName, lastName, email, phone, departureDate, returnDate, travelers, budget, comments });
  await booking.save();
  res.status(201).json({ message: "Booking request submitted! We'll contact you within 24 hours.", booking });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});