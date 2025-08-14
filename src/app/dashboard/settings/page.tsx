'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [name, setName] = useState(user?.user_metadata?.name || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpdateName = async () => {
    if (!user) return;
    const { error } = await supabase.from('users').update({ name }).eq('id', user.id);
    if (error) setError(error.message);
    else setSuccess('Name updated!');
  };

  const handleUploadAvatar = async () => {
    if (!avatarFile || !user) return;
    setUploading(true);
    const filePath = `${user.id}/avatar.${avatarFile.name.split('.').pop()}`;
    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, avatarFile);
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
    const { error: updateError } = await supabase.from('users').update({ avatar_url: publicUrl }).eq('id', user.id);
    if (updateError) setError(updateError.message);
    else setSuccess('Avatar updated!');
    setUploading(false);
  };

  if (authLoading) return <div>Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        {error && <Alert variant="destructive">{error}</Alert>}
        {success && <Alert>{success}</Alert>}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input value={name} onChange={e => setName(e.target.value)} />
              <Button onClick={handleUpdateName} className="mt-2">Update Name</Button>
            </div>
            <div>
              <Label>Avatar</Label>
              <Input type="file" onChange={e => setAvatarFile(e.target.files?.[0] || null)} />
              <Button onClick={handleUploadAvatar} disabled={uploading} className="mt-2">
                {uploading ? 'Uploading...' : 'Upload Avatar'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
} 