'use client';

import React, { useEffect, useState, use } from 'react';
import Navbar from '@/components/Navbar';
import { api } from '@/services/api';
import { Star, ChevronLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw, Share } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [reviewForm, setReviewForm] = useState({ name: '', comment: '', rating: 5 });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, reviewsData] = await Promise.all([
          api.getProductById(id),
          api.getReviews(id)
        ]);
        
        console.log(`Fetched product data. id: ${id}, productData: ${JSON.stringify(productData)}`);
        setProduct(productData);
        
        console.log(`Fetched reviews data. id: ${id}, reviewsData: ${JSON.stringify(reviewsData)}`);
        setReviews(reviewsData);
        
        if (productData?.sizes?.length > 0) {
          setSelectedSize(productData.sizes[0]);
          console.log(`Set selected size. selectedSize: ${productData.sizes[0]}`);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
        console.log(`Loading state set to false. loading: false`);
      }
    };

    fetchData();
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingReview(true);
    console.log(`Submitting review. reviewForm: ${JSON.stringify(reviewForm)}`);
    try {
      const newReview = await api.postReview({
        productId: id,
        ...reviewForm
      });
      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      console.log(`New review posted. newReview: ${JSON.stringify(newReview)}, reviews: ${JSON.stringify(updatedReviews)}`);
      setReviewForm({ name: '', comment: '', rating: 5 });
    } catch (error) {
      console.error('Error posting review:', error);
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = `Check out ${product.name}`;
    const shareText = `I found this amazing perfume: ${product.name} - ${product.description}`;

    // Try native share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to social media share URLs
      const encodedUrl = encodeURIComponent(shareUrl);
      const encodedTitle = encodeURIComponent(shareTitle);
      const encodedText = encodeURIComponent(shareText);

      const shareOptions = {
        twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        email: `mailto:?subject=${encodedTitle}&body=${encodedText}`,
      };

      // Create a simple menu for desktop users
      const menuHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); text-align: center;">
          <p style="margin-bottom: 16px; font-weight: 600;">Share on</p>
          <div style="display: flex; gap: 12px; flex-direction: column;">
            <a href="${shareOptions.twitter}" target="_blank" style="padding: 10px; background: #1DA1F2; color: white; border-radius: 8px; text-decoration: none; font-size: 14px;">Twitter</a>
            <a href="${shareOptions.facebook}" target="_blank" style="padding: 10px; background: #1877F2; color: white; border-radius: 8px; text-decoration: none; font-size: 14px;">Facebook</a>
            <a href="${shareOptions.linkedin}" target="_blank" style="padding: 10px; background: #0A66C2; color: white; border-radius: 8px; text-decoration: none; font-size: 14px;">LinkedIn</a>
            <a href="${shareOptions.email}" style="padding: 10px; background: #EA4335; color: white; border-radius: 8px; text-decoration: none; font-size: 14px;">Email</a>
          </div>
        </div>
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999; background: rgba(0,0,0,0.5);" id="shareMenuBackdrop"></div>
      `;

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = menuHTML;
      document.body.appendChild(tempDiv);

      // Remove menu when clicking backdrop
      document.getElementById('shareMenuBackdrop')?.addEventListener('click', () => {
        tempDiv.remove();
      });

      // Remove menu after 10 seconds
      setTimeout(() => {
        if (document.body.contains(tempDiv)) {
          tempDiv.remove();
        }
      }, 10000);
    }
  };

  console.log(`Loading check. loading: ${loading}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  console.log(`Product existence check. product: ${JSON.stringify(product)}`);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-serif mb-4">Product not found</h1>
        <Link href="/" className="text-black underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gray-100">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1).map((img: string, idx: number) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img src={img} alt={`${product.name} ${idx + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-black text-white text-[10px] font-bold tracking-widest uppercase rounded-full">
                  {product.gender}
                </span>
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">({reviews.length} reviews)</span>
                </div>
                <button
                  onClick={handleShare}
                  className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
                  title="Share this product"
                >
                  <Share className="w-5 h-5 text-gray-600 hover:text-black" />
                </button>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-2xl font-medium text-gray-900">${product.price}</p>
            </div>

            <div className="prose prose-sm text-gray-600 mb-8">
              <p>{product.description}</p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-2xl">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Longevity</p>
                <p className="text-sm font-medium text-gray-900">{product.longevity}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sillage</p>
                <p className="text-sm font-medium text-gray-900">{product.sillage}</p>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-gray-900 mb-4">Select Size</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                      selectedSize === size 
                        ? 'bg-black text-white' 
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-black text-white py-5 rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-gray-800 transition-all transform active:scale-[0.98] mb-8">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              <div className="text-center">
                <ShieldCheck className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                <p className="text-[10px] font-medium text-gray-500">Authentic</p>
              </div>
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                <p className="text-[10px] font-medium text-gray-500">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                <p className="text-[10px] font-medium text-gray-500">7-Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-24 pt-16 border-t border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Customer Reviews</h2>
              <div className="bg-gray-50 p-8 rounded-3xl">
                <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Name</label>
                    <input 
                      type="text" 
                      required
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Rating</label>
                    <select 
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                    >
                      {[5,4,3,2,1].map(num => (
                        <option key={num} value={num}>{num} Stars</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Comment</label>
                    <textarea 
                      required
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                      placeholder="Share your thoughts..."
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={submittingReview}
                    className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all disabled:opacity-50"
                  >
                    {submittingReview ? 'Posting...' : 'Post Review'}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-8">
                {reviews.length > 0 ? (
                  reviews.map((review: any) => (
                    <div key={review.id} className="pb-8 border-b border-gray-100 last:border-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400">
                            {review.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{review.name}</p>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-3xl">
                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
