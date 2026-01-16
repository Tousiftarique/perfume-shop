BEGIN;

-- Seed products
INSERT INTO products (name, description, price, images, sizes, longevity, sillage, gender)
VALUES 
(
  'Midnight Rose', 
  'A mysterious blend of dark rose, patchouli, and warm amber. This fragrance captures the essence of a moonlit garden, where the deep, velvety notes of Bulgarian rose meet the earthy richness of Indonesian patchouli.', 
  120, 
  ARRAY['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800'], 
  ARRAY['50ml', '100ml', '150ml'], 
  '8-10 Hours', 
  'Moderate', 
  'Unisex'
),
(
  'Ocean Breeze', 
  'Fresh sea salt combined with citrus and light floral notes. Perfect for a bright summer day by the coast.', 
  95, 
  ARRAY['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'], 
  ARRAY['50ml', '100ml'], 
  '6-8 Hours', 
  'Soft', 
  'Unisex'
),
(
  'Golden Oud', 
  'Rich agarwood with hints of saffron and vanilla. A luxurious and deep scent for special occasions.', 
  180, 
  ARRAY['https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&q=80&w=800'], 
  ARRAY['50ml', '100ml'], 
  '12+ Hours', 
  'Strong', 
  'Masculine'
),
(
  'Velvet Vanilla', 
  'Creamy Madagascar vanilla with a touch of sandalwood. Sweet, comforting, and sophisticated.', 
  110, 
  ARRAY['https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800'], 
  ARRAY['50ml', '100ml', '150ml'], 
  '8-10 Hours', 
  'Moderate', 
  'Feminine'
),
(
  'Citrus Bloom', 
  'Energizing bergamot and orange blossom for a bright day. A refreshing burst of sunshine in a bottle.', 
  85, 
  ARRAY['https://images.unsplash.com/photo-1563170351-be82bc888bb4?auto=format&fit=crop&q=80&w=800'], 
  ARRAY['50ml', '100ml'], 
  '4-6 Hours', 
  'Soft', 
  'Unisex'
);

COMMIT;