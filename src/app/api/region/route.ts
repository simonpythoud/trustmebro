import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { region } = await req.json().catch(() => ({}))
  if (!region || (region !== 'eu' && region !== 'us')) {
    return NextResponse.json({ error: 'region required' }, { status: 400 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set('region', region, { path: '/', sameSite: 'lax' })
  return res
}


