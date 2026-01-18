'use client';

import React from 'react';

export default function Hero() {
  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#f3f4f6]">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Perfume" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 tracking-tight text-gray-900">
          Discover Premium Fragrances
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 font-light max-w-2xl mx-auto">
          {/* Experience the art of scent with our curated collection of world-class perfumes. */}
        </p>
        <button className="bg-black text-white px-10 py-4 rounded-full text-sm font-medium hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95">
          Explore Collection
        </button>
      </div>
    </div>
  );
}
