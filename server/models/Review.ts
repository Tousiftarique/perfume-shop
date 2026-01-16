import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, default: 5 },
}, { timestamps: true });

export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
