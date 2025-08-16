import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { mapUserFromDb } from '@/lib/mappers';

export async function GET(_req: Request, context: unknown) {
  try {
    const { params } = (context || {}) as { params: { id: string } };
    const userId = params?.id;
    if (!userId) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const supabaseServer = getSupabaseServer();
    const { data, error } = await supabaseServer
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error && (error as any).code !== 'PGRST116') {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ user: mapUserFromDb(data) });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}



