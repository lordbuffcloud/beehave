'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SpendRequestsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-honey-100 to-bee-200 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-honey-900 mb-8">💰 Spend Requests</h1>
          
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>New Toy</span>
                  <Badge variant="secondary">Pending</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Cost: 🍯 15</p>
                <p>Requested by: Child 1</p>
                <p>Description: LEGO set from the store</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="default">Approve</Button>
                  <Button variant="outline">Deny</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Ice Cream</span>
                  <Badge variant="default">Approved</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Cost: 🍯 3</p>
                <p>Requested by: Child 2</p>
                <p>Description: Chocolate ice cream</p>
                <p className="text-green-600 mt-2">✅ Approved on Dec 15</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 