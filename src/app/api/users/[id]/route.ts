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

    const errorCode = (() => {
      if (typeof error === 'object' && error !== null && 'code' in (error as Record<string, unknown>)) {
        const codeVal = (error as Record<string, unknown>).code;
        return typeof codeVal === 'string' ? codeVal : String(codeVal);
      }
      return undefined;
    })();
    if (error && errorCode !== 'PGRST116') {
      return NextResponse.json({ error: (error as { message: string }).message }, { status: 500 });
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



