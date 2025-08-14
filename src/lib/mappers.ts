import type { Database } from '@/types/database';
import type { User } from '@/types';

export function mapUserFromDb(dbUser: Database['public']['Tables']['users']['Row'] | null): User | null {
  if (!dbUser) return null;

  return {
    id: dbUser.id,
    name: dbUser.name,
    role: dbUser.role,
    uiMode: dbUser.ui_mode,
    honeyBalance: dbUser.honey_balance ?? 0,
    avatarURL: dbUser.avatar_url ?? undefined,
    familyId: dbUser.family_id ?? undefined,
    createdAt: new Date(dbUser.created_at),
    updatedAt: new Date(dbUser.updated_at),
  };
}



