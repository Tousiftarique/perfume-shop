import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './models/Product';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/perfume-shop';

const products = [
  {
    name: 'Midnight Rose',
    description: 'A mysterious blend of dark rose, patchouli, and warm amber. This fragrance captures the essence of a moonlit garden, where the deep, velvety notes of Bulgarian rose meet the earthy richness of Indonesian patchouli.',
    price: 120,
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['50ml', '100ml', '150ml'],
    longevity: '8-10 Hours',
    sillage: 'Moderate',
    gender: 'Unisex'
  },
  {
    name: 'Ocean Breeze',
    description: 'Fresh sea salt combined with citrus and light floral notes. Perfect for a bright summer day by the coast.',
    price: 95,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['50ml', '100ml'],
    longevity: '6-8 Hours',
    sillage: 'Soft',
    gender: 'Unisex'
  },
  {
    name: 'Golden Oud',
    description: 'Rich agarwood with hints of saffron and vanilla. A luxurious and deep scent for special occasions.',
    price: 180,
    images: [
      'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['50ml', '100ml'],
    longevity: '12+ Hours',
    sillage: 'Strong',
    gender: 'Masculine'
  },
  {
    name: 'Velvet Vanilla',
    description: 'Creamy Madagascar vanilla with a touch of sandalwood. Sweet, comforting, and sophisticated.',
    price: 110,
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['50ml', '100ml', '150ml'],
    longevity: '8-10 Hours',
    sillage: 'Moderate',
    gender: 'Feminine'
  },
  // {
  //   name: 'Citrus Bloom',
  //   description: 'Energizing bergamot and orange blossom for a bright day. A refreshing burst of sunshine in a bottle.',
  //   price: 85,
  //   images: [
  //     'https://forestoud.com/cdn/shop/files/3_226cba42-adfd-4043-b7f0-ea3c557900a7_600x600_crop_center.jpg?v=1761939621'
  //   ],
  //   sizes: ['50ml', '100ml'],
  //   longevity: '4-6 Hours',
  //   sillage: 'Soft',
  //   gender: 'Unisex'
  // }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(products);
    console.log('Seeded products successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
