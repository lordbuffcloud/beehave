'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User as SupabaseUser, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { User } from '@/types';
// mapUserFromDb is used via server API; keep import if needed in future

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const createMissingUserRecord = useCallback(async (authUser: SupabaseUser) => {
    try {
      const res = await fetch('/api/bootstrap-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: authUser.id, email: authUser.email, name: authUser.user_metadata?.name }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to bootstrap user');
      setUser(json.user);
    } catch (err) {
      console.error('Failed to create user record:', err);
      setUser({
        id: authUser.id,
        name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
        role: 'manager',
        uiMode: 'adult',
        honeyBalance: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }, []);

  const loadUserProfile = useCallback(async (authUser: SupabaseUser) => {
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(authUser.id)}`, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      if (res.status === 404 || (res.ok && !json?.user)) {
        console.log('User profile not found, creating new user record');
        await createMissingUserRecord(authUser);
        return;
      }
      if (!res.ok) {
        throw new Error(json?.error || 'Failed to load user');
      }
      setUser(json.user);
    } catch (err) {
      console.error('Failed to load user profile:', err);
      setUser({
        id: authUser.id,
        name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
        role: 'manager',
        uiMode: 'adult',
        honeyBalance: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }, [setUser, createMissingUserRecord]);

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        if (session?.user) {
          // Do not block UI on profile load
          void loadUserProfile(session.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session?.user) {
        void loadUserProfile(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [loadUserProfile]);

  

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) {
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      setUser(null);
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 