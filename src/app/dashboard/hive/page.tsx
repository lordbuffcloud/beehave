'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { ProtectedRoute } from '@/components/auth/protected-route';

type AddFormData = { name: string; pin: string };

export default function HivePage() {
  const { user } = useAuth();
  const [familyMembers, setFamilyMembers] = useState<Array<{ id: string; name: string }>>([]);
  const [formData, setFormData] = useState<AddFormData>({ name: '', pin: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFamily = async () => {
      if (!user) return;
      try {
        const res = await fetch(`/api/family-members?managerUserId=${encodeURIComponent(user.id)}`, {
          headers: { 'Accept': 'application/json' },
        });
        const text = await res.text();
        let json: unknown;
        try { json = JSON.parse(text); } catch {
          throw new Error('Unexpected response from server');
        }
        const parsed = json as { members?: Array<{ id: string; name: string }> ; error?: string };
        if (!res.ok) throw new Error(parsed.error || 'Failed to load members');
        setFamilyMembers(parsed.members || []);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        setError(message);
      }
      setLoading(false);
    };
    fetchFamily();
  }, [user]);

  const handleAddMember = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/family-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ managerUserId: user?.id, name: formData.name, pin: formData.pin }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to add member');
      setFamilyMembers(prev => [...prev, { id: json.member.id, name: json.member.name }]);
      setFormData({ name: '', pin: '' });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading family...</div>;

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Family Hive</h1>
        {error && <Alert variant="destructive">{error}</Alert>}
        <div className="grid gap-4 mt-4">
          {familyMembers.map(member => (
            <Card key={member.id}>
              <CardHeader>
                <CardTitle>{member.name} ({member.role})</CardTitle>
              </CardHeader>
              <CardContent>
                Honey: {member.honeyBalance}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-xl">Add Family Member</h2>
          <form className="space-y-4 mt-4" onSubmit={e => { e.preventDefault(); handleAddMember(); }}>
            <div>
              <Label>Name</Label>
              <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <Label>PIN</Label>
              <Input type="password" value={formData.pin} onChange={e => setFormData({ ...formData, pin: e.target.value })} />
            </div>
            <Button type="submit" disabled={loading}>Add Child</Button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
} 