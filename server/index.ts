import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Product } from './models/Product';
import { Review } from './models/Review';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/perfume-shop';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
// GET /api/products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// GET /api/products/:id
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// GET /api/reviews/:productId
app.get('/api/reviews/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// POST /api/reviews
app.post('/api/reviews', async (req, res) => {
  try {
    const { productId, name, comment, rating } = req.body;
    const newReview = new Review({ productId, name, comment, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Error creating review' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
