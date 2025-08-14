'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ChoresPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-honey-100 to-bee-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-honey-900">📋 Chores</h1>
            <Button>Add New Chore</Button>
          </div>
          
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Clean Room</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Status: Open</p>
                <p>Honey Value: 🍯 5</p>
                <p>Assigned to: Child 1</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Feed Pets</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Status: Done</p>
                <p>Honey Value: 🍯 3</p>
                <p>Assigned to: Child 2</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 