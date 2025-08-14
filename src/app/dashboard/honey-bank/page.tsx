'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';

export default function HoneyBankPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-honey-100 to-bee-200 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-honey-900 mb-8">🍯 Honey Bank</h1>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-honey-700">
                  🍯 {user?.honeyBalance || 0}
                </div>
                <p className="text-honey-600 mt-2">Total honey earned</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Cleaned room</span>
                    <span className="text-green-600">+🍯 5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fed pets</span>
                    <span className="text-green-600">+🍯 3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Toy purchase</span>
                    <span className="text-red-600">-🍯 10</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 