import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { mapUserFromDb } from '@/lib/mappers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, email, name, role } = body as { id: string; email?: string; name?: string; role?: 'manager' | 'child' };
    if (!id) {
      return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
    }

    const displayName = name || email?.split('@')[0] || 'User';

    // Check if user exists
    const supabaseServer = getSupabaseServer();
    const { data: existing, error: selectError } = await supabaseServer
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (!selectError && existing) {
      return NextResponse.json({ user: mapUserFromDb(existing) });
    }

    let familyId: string | null = null;
    if ((role ?? 'manager') === 'manager') {
      const { data: family, error: familyError } = await supabaseServer
        .from('families')
        .insert({ name: `${displayName}'s Family` })
        .select()
        .single();
      if (familyError) {
        return NextResponse.json({ error: familyError.message }, { status: 500 });
      }
      familyId = family!.id;
    }

    // Create user record
    const { data: user, error: userError } = await supabaseServer
      .from('users')
      .insert({
        id,
        name: displayName,
        role: (role ?? 'manager'),
        ui_mode: (role ?? 'manager') === 'manager' ? 'adult' : 'kid',
        honey_balance: 0,
        family_id: familyId,
      })
      .select()
      .single();

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    return NextResponse.json({ user: mapUserFromDb(user) });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


