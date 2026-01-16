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
            Founded in 2024, ESSENCE was born from a passion for the transformative power of scent. We believe that a fragrance is more than just a smell—it's an identity, a memory, and an art form.
          </p>
          <p className="mb-6">
            Our master perfumers travel the globe to source the finest raw materials, from the rose fields of Bulgaria to the sandalwood forests of Mysore. Each bottle is a testament to our commitment to quality and craftsmanship.
          </p>
          <p>
            We invite you to explore our collection and find the scent that speaks to your soul.
          </p>
        </div>
      </div>
    </main>
  );
}
