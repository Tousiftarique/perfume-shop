BEGIN;

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  images TEXT[] NOT NULL,
  sizes TEXT[] NOT NULL,
  category TEXT,
  longevity TEXT,
  sillage TEXT,
  gender TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  comment TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on reviews" ON reviews FOR INSERT WITH CHECK (true);

COMMIT;