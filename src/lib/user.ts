import { env } from './env'

export async function getRequestUserEmail(): Promise<string | null> {
  try {
    // Dynamic import to avoid bundling next-auth in test mode
    const mod = await import('@/lib/auth')
    const session = await mod.auth()
    const email = session?.user?.email ?? null
    if (!email) console.warn('[auth] getRequestUserEmail: no session email')
    return email
  } catch (e) {
    console.error('[auth] getRequestUserEmail failed', e)
    return null
  }
}


