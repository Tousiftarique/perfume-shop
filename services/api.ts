import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const api = {
  getProducts: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  getProductById: async (id: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  getReviews: async (productId: string) => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  postReview: async (reviewData: { productId: string; name: string; comment: string; rating: number }) => {
    const { data, error } = await supabase
      .from('reviews')
      .insert([{
        product_id: reviewData.productId,
        name: reviewData.name,
        comment: reviewData.comment,
        rating: reviewData.rating
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
