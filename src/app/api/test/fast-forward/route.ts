import { env } from '@/lib/env'

export const runtime = 'nodejs'

export async function POST() {
  if (!env.FEATURE_TEST_ENDPOINTS) return new Response('Not found', { status: 404 })
	// In real implementation, advance deadlines or set a flag checked by scheduler.
	return Response.json({ ok: true })
}
