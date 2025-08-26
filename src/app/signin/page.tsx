"use client"
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useI18n } from '@/lib/i18n-react'

export default function SignInPage() {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <h1 className="text-2xl font-semibold mb-4">{t('auth.signin.title')}</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setError(null)
          const res = await signIn('credentials', {
            email,
            password,
            redirect: true,
            callbackUrl: '/dashboard'
          })
          if ((res as any)?.error) setError((res as any).error)
        }}
        className="space-y-4 rounded-lg border border-foreground/10 p-6 bg-background/60"
      >
        <div>
          <label className="block text-sm mb-1">{t('auth.signin.email')}</label>
          <input data-testid="auth-email" className="border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-foreground/20" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">{t('auth.signin.password')}</label>
          <input data-testid="auth-password" type="password" className="border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-foreground/20" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button data-testid="auth-submit" className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90" type="submit">{t('auth.signin.submit')}</button>
      </form>
    </div>
  )
}


