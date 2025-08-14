import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { z } from 'zod';

const loginSchema = z.object({
  managerUserId: z.string().uuid(),
  memberId: z.string().uuid(),
  pin: z.string().min(4).max(12),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    const { managerUserId, memberId, pin } = parsed.data;

    const { data: manager } = await supabaseServer
      .from('users')
      .select('id, role, family_id')
      .eq('id', managerUserId)
      .single();

    if (!manager || manager.role !== 'manager' || !manager.family_id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const { data: member, error } = await supabaseServer
      .from('family_members')
      .select('id, name, pin_hash, family_id')
      .eq('id', memberId)
      .single();
    if (error || !member || member.family_id !== manager.family_id) {
      return NextResponse.json({ error: 'Invalid member' }, { status: 400 });
    }

    const bcrypt = await import('bcryptjs');
    const valid = await bcrypt.compare(pin, member.pin_hash);
    if (!valid) return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 });

    return NextResponse.json({ success: true, member: { id: member.id, name: member.name } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}



