// app/api/restaurants/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL!
const anon = process.env.SUPABASE_KEY!

function sb(token?: string) {
  return createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
    ...(token
      ? { global: { headers: { Authorization: `Bearer ${token}` } } }
      : {}),
  })
}

export async function GET(req: Request) {
  const u = new URL(req.url)
  const search = u.searchParams.get('q')?.trim() ?? ''

  // read bearer token if the request is authenticated (optional)
  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length).trim()
    : undefined

  let query = sb(token).from('restaurants').select('*').limit(20)
  if (search) query = query.ilike('name', `%${search}%`)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ items: data ?? [] })
}
