import { env } from './env'

export async function getRequestUserEmail(): Promise<string | null> {
  if (env.FEATURE_TEST_ENDPOINTS) return 'brand@example.com'
  try {
    // Dynamic import to avoid bundling next-auth in test mode
    const mod = await import('@/auth')
    const session = await mod.auth()
    return session?.user?.email ?? null
  } catch {
    return null
  }
}


