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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 