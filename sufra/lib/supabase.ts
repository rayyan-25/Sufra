import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL!;
const anon = process.env.SUPABASE_KEY!;

export const supabase = createClient(url, anon, {
  auth: { persistSession: false, autoRefreshToken: false },
});
