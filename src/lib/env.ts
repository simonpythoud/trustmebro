const required = (key: string, fallback?: string) => {
  const v = process.env[key] ?? fallback
  if (!v) throw new Error(`Missing env var: ${key}`)
  return v
}

export const env = {
  DATABASE_URL: required('DATABASE_URL'),
  NEXTAUTH_URL: required('NEXTAUTH_URL', 'http://localhost:3000'),
  NEXTAUTH_SECRET: required('NEXTAUTH_SECRET', 'devsecret'),
  PSP: process.env.PSP ?? 'stripe',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? '',
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY ?? '',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ?? '',
  STRIPE_CONNECT_TYPE: process.env.STRIPE_CONNECT_TYPE ?? 'standard',
  AUTO_APPROVE_HOURS: Number(process.env.AUTO_APPROVE_HOURS ?? '48'),
  FEATURE_TEST_ENDPOINTS: (process.env.FEATURE_TEST_ENDPOINTS ?? 'false') === 'true',
}


