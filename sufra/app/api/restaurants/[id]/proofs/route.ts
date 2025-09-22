// app/api/restaurants/[id]/proofs/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase' // your existing singleton client

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // optional filters: ?status=approved|pending|rejected, ?limit=30
  const url = new URL(req.url)
  const status = url.searchParams.get('status') ?? 'approved'
  const limit = Number(url.searchParams.get('limit') ?? 30)

  let q = supabase
    .from('proofs')
    .select('id, type, url, notes, status, created_at')
    .eq('restaurant_id', params.id)
    .order('created_at', { ascending: false })
    .limit(limit)

  // by default we filter to approved; you can remove this if you want to rely only on RLS
  if (status) q = q.eq('status', status)

  const { data, error } = await q
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ items: data ?? [] })
}
