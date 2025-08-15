import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { z } from 'zod';

const createSchema = z.object({
  managerUserId: z.string().uuid(),
  name: z.string().min(1).max(100),
  pin: z.string().min(4).max(12),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const managerUserId = searchParams.get('managerUserId');
    if (!managerUserId) return NextResponse.json({ error: 'managerUserId required' }, { status: 400 });

    const supabaseServer = getSupabaseServer();
    const { data: manager, error: managerError } = await supabaseServer
      .from('users')
      .select('id, role, family_id')
      .eq('id', managerUserId)
      .single();

    if (managerError) return NextResponse.json({ error: managerError.message }, { status: 500 });
    if (!manager || manager.role !== 'manager' || !manager.family_id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const { data: members, error } = await supabaseServer
      .from('family_members')
      .select('id, name, family_id, created_at, updated_at')
      .eq('family_id', manager.family_id)
      .order('created_at', { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ members });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    const { managerUserId, name, pin } = parsed.data;

    const { data: manager } = await supabaseServer
      .from('users')
      .select('id, role, family_id')
      .eq('id', managerUserId)
      .single();

    if (!manager || manager.role !== 'manager' || !manager.family_id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const bcrypt = await import('bcryptjs');
    const pinHash = await bcrypt.hash(pin, 10);

    const { data: member, error } = await supabaseServer
      .from('family_members')
      .insert({ family_id: manager.family_id, name, pin_hash: pinHash })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ member });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


