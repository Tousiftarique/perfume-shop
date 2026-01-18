'use client';

import React from 'react';
import Navbar from '@/components/Navbar';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold mb-8">Our Story</h1>
        <div className="prose prose-lg text-gray-600">
          <p className="mb-6">
           Founded in 2026, FRAGRANCE HUB was born from a deep passion for luxury fragrances and timeless elegance. We believe a scent has the power to define moments, evoke memories, and create unforgettable impressions.


          </p>
          <p className="mb-6">
            Our perfumes are crafted using carefully selected ingredients and refined techniques to ensure sophistication, depth, and lasting quality in every bottle. 
          </p>
          <p>
           Step into the world of FRAGRANCE HUB and discover a signature fragrance that reflects your individuality.
          </p>
        </div>
      </div>
    </main>
  );
}
