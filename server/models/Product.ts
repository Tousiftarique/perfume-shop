import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  sizes: [{ type: String, required: true }],
  category: { type: String },
  longevity: { type: String },
  sillage: { type: String },
  gender: { type: String },
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
