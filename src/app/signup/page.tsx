"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/lib/i18n-react'

export default function SignUpPage() {
  const router = useRouter()
  const { t } = useI18n()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'brand' | 'creator'>('creator')
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <h1 className="text-2xl font-semibold mb-4">{t('auth.signup.title')}</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setError(null)
          const res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role }),
          })
          if (!res.ok) {
            const j = await res.json().catch(() => ({}))
            setError(j?.error ?? t('auth.signup.error'))
            return
          }
          router.push('/signin')
        }}
        className="space-y-4 rounded-lg border border-foreground/10 p-6 bg-background/60"
      >
        <div>
          <label className="block text-sm mb-1">{t('auth.signup.name')}</label>
          <input className="border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-foreground/20" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">{t('auth.signup.email')}</label>
          <input className="border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-foreground/20" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">{t('auth.signup.password')}</label>
          <input type="password" className="border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-foreground/20" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">{t('auth.signup.role')}</label>
          <select className="border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-foreground/20" value={role} onChange={(e)=>setRole(e.target.value as any)}>
            <option value="creator">{t('auth.signup.creator')}</option>
            <option value="brand">{t('auth.signup.brand')}</option>
          </select>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90" type="submit">{t('auth.signup.submit')}</button>
      </form>
    </div>
  )
}


