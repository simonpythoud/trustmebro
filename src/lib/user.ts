import { env } from './env'

export async function getRequestUserEmail(): Promise<string | null> {
  try {
    // Dynamic import to avoid bundling next-auth in test mode
    const mod = await import('@/auth')
    const session = await mod.auth()
    return session?.user?.email ?? null
  } catch {
    return null
  }
}


