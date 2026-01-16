# Migration Plan: MongoDB to Supabase

The application is currently failing because it's trying to connect to a local MongoDB instance which is not available. I will migrate the data layer to use Supabase (PostgreSQL) which is already configured in the project.

## Steps
1. **Seed Supabase Database**: Populate the `products` table with initial data using `supabase/seed.sql`.
2. **Update API Service**: Rewrite `services/api.ts` to use the Supabase client instead of fetching from a local Express/MongoDB server.
3. **Update Components**: Adjust `app/page.tsx` and `app/product/[id]/page.tsx` to handle the new data structure (e.g., `id` instead of `_id`).
4. **Cleanup**: Remove the unused `server/` directory and MongoDB-related dependencies.
