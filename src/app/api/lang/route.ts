import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { lang } = await req.json().catch(() => ({}))
  if (!lang || typeof lang !== 'string') {
    return NextResponse.json({ error: 'lang required' }, { status: 400 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set('lang', lang, { path: '/', sameSite: 'lax' })
  return res
}


