'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/auth/login');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-honey-100 to-bee-200 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 text-6xl animate-float">
              🐝
            </div>
            <h1 className="mt-6 text-4xl font-bold text-honey-900">
              Welcome to Beehave
            </h1>
            <p className="mt-2 text-lg text-honey-700">
              Family chore management with honey rewards
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-honey-200 shadow-lg">
              <h2 className="text-xl font-semibold text-honey-900 mb-2">
                Getting Started
              </h2>
              <p className="text-honey-700">
                Set up your Supabase configuration to begin using Beehave.
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-honey-600">
                Loading authentication...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // This should not be reached due to the useEffect redirect
  return null;
} 