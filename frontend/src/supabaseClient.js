
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
console.log("supabaseURL:"+supabaseUrl)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
