// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

type Body = { email: string; password: string; first_name?: string; last_name?: string };

export async function POST(req: Request) {
  try {
    const { email, password, first_name, last_name } = (await req.json()) as Body;
    if (!email || !password) {
      return NextResponse.json({ error: 'email and password required' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name, last_name } },
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    const token = data.session?.access_token ?? null; // null if email confirmation is enabled
    return NextResponse.json(
      token
        ? { access_token: token, token_type: 'bearer' }
        : { message: 'Registered. Check your email to confirm.' },
      { status: 200 }
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
