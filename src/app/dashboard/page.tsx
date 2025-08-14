'use client';

import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, signOut } = useAuth();

  if (!user) return <div>Loading...</div>;

  if (user.uiMode === 'kid') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-honey-100 to-bee-200 p-4">
        <h1 className="text-3xl font-bold text-honey-900">Kid Dashboard 🐝</h1>
        <p>Your chores (max 5):</p>
        {/* Placeholder for chores */}
        <div className="mt-4 space-y-2">
          <div className="p-4 bg-white rounded-lg shadow">Chore 1: Clean room</div>
          <div className="p-4 bg-white rounded-lg shadow">Chore 2: Feed pets</div>
        </div>
        <Button onClick={signOut} className="mt-4">Sign Out</Button>
      </div>
    );
  }

  // Parent dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-honey-100 to-bee-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-honey-900">
              Welcome, {user.name}! 🐝
            </h1>
            <p className="text-honey-700">Manage your family&apos;s chores and rewards</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href={{ pathname: '/dashboard/hive' }}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>🏠 Hive</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Family overview and stats</p>
              </CardContent>
            </Card>
          </Link>

          <Link href={{ pathname: '/dashboard/chores' }}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>📋 Chores</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Manage family chores</p>
              </CardContent>
            </Card>
          </Link>

          <Link href={{ pathname: '/dashboard/honey-bank' }}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>🍯 Honey Bank</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Track honey rewards</p>
              </CardContent>
            </Card>
          </Link>

          <Link href={{ pathname: '/dashboard/spend-requests' }}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>💰 Spend Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Review spending requests</p>
              </CardContent>
            </Card>
          </Link>

          <Link href={{ pathname: '/dashboard/analytics' }}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>📊 Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p>View completion stats</p>
              </CardContent>
            </Card>
          </Link>

          <Link href={{ pathname: '/dashboard/settings' }}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>⚙️ Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Configure your hive</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
} 