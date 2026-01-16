'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-serif font-bold tracking-tighter text-gray-900">
              ESSENCE
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Home</Link>
            <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Products</Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Contact</Link>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingBag className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">Home</Link>
            <Link href="/products" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">Products</Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">About</Link>
            <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
