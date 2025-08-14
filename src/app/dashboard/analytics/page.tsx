'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-honey-100 to-bee-200 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-honey-900 mb-8">📊 Analytics</h1>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-honey-700">85%</div>
                <p className="text-honey-600">This week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Honey Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-honey-700">🍯 42</div>
                <p className="text-honey-600">This month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Active Chores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-honey-700">12</div>
                <p className="text-honey-600">Currently open</p>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Monday</span>
                      <span>4/5 chores</span>
                    </div>
                    <div className="w-full bg-honey-200 rounded-full h-2">
                      <div className="bg-honey-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Tuesday</span>
                      <span>5/5 chores</span>
                    </div>
                    <div className="w-full bg-honey-200 rounded-full h-2">
                      <div className="bg-honey-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Wednesday</span>
                      <span>3/5 chores</span>
                    </div>
                    <div className="w-full bg-honey-200 rounded-full h-2">
                      <div className="bg-honey-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
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