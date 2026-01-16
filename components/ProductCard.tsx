'use client';

import React from 'react';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, description, price, image }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group">
      <div className="product-card-hover bg-white rounded-2xl overflow-hidden border border-gray-100 h-full flex flex-col">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
              New
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2">{name}</h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{description}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-medium text-gray-900">${price}</span>
            <span className="text-xs font-medium text-black underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
