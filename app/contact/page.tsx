'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-8">Get in Touch</h1>
            <p className="text-gray-600 mb-12">
              Have questions about our fragrances or need help choosing the perfect scent? Our team is here to assist you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</p>
                  <p className="text-gray-900">concierge@essence.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                  <p className="text-gray-900">+1 (555) 000-0000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Boutique</p>
                  <p className="text-gray-900">123 Fragrance Way, New York, NY</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"></textarea>
              </div>
              <button className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
