import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

function isValidUrl(url: string): boolean {
  if (!url || url.includes('your-supabase-project')) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Client-side helper
export const getSupabaseClient = (): SupabaseClient | null => {
  if (!isValidUrl(supabaseUrl) || !supabaseAnonKey) {
    return null;
  }
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
};

// Admin helper for server-side API routes
export const getSupabaseAdmin = (): SupabaseClient | null => {
  if (!isValidUrl(supabaseUrl) || !supabaseServiceKey) {
    return null;
  }
  try {
    return createClient(supabaseUrl, supabaseServiceKey);
  } catch (err) {
    console.error('Failed to initialize Supabase admin client:', err);
    return null;
  }
};
