'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

export default function PinLoginPage() {
  const { user } = useAuth();
  const [memberId, setMemberId] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch('/api/family-members/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ managerUserId: user?.id, memberId, pin }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Invalid credentials');
      setSuccess(`Welcome, ${json.member.name}! Limited access granted.`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-honey-100 to-bee-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Child PIN Login</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <Alert variant="destructive">{error}</Alert>}
          {success && <Alert>{success}</Alert>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label>Member ID</Label>
              <Input value={memberId} onChange={e => setMemberId(e.target.value)} />
            </div>
            <div>
              <Label>PIN</Label>
              <Input type="password" value={pin} onChange={e => setPin(e.target.value)} />
            </div>
            <Button type="submit" disabled={loading} className="w-full">{loading ? 'Checking...' : 'Enter'}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}



