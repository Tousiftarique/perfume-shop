'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { api } from '@/services/api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold mb-12">All Fragrances</h1>
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <ProductCard 
                key={product.id} 
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.images[0]}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
