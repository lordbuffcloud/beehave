// Admin utilities for debugging Supabase issues
// Use service role key for admin operations

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
// server admin utilities (avoid importing in client components)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Admin client (for server-side utilities only)
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Debug function to check if user exists
export async function checkUserExists(userId: string) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  console.log('User check result:', { data, error });
  return { data, error };
}

// Function to create missing user record
export async function createUserRecord(userId: string, userData: {
  name: string;
  role: 'manager' | 'child';
  family_id?: string;
}) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .insert({
      id: userId,
      name: userData.name,
      role: userData.role,
      family_id: userData.family_id,
      ui_mode: userData.role === 'child' ? 'kid' : 'adult',
      honey_balance: 0
    })
    .select()
    .single();
  
  console.log('User creation result:', { data, error });
  return { data, error };
}

// Function to create family for manager
export async function createFamily(name: string) {
  const { data, error } = await supabaseAdmin
    .from('families')
    .insert({ name })
    .select()
    .single();
  
  console.log('Family creation result:', { data, error });
  return { data, error };
}

// Function to fix user data mapping
// Deprecated: use mapUserFromDb from '@/lib/mappers'