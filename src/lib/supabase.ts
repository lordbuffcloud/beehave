// Supabase configuration and client initialization
// This file sets up Supabase Auth, Database, and Storage for Beehave

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with TypeScript support
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Helper functions for common operations
export const auth = supabase.auth;
export const storage = supabase.storage;

// Database helpers
export const db = {
  users: () => supabase.from('users'),
  chores: () => supabase.from('chores'),
  spend_requests: () => supabase.from('spend_requests'),
  transactions: () => supabase.from('transactions'),
};

export default supabase; 