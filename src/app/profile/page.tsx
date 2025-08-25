"use client"
import { useEffect, useState } from 'react'

type Profile = {
  companyName?: string | null
  vatId?: string | null
  address?: string | null
  country?: string | null
}
type Settings = {
  theme: string
  language: string
  region: string
  timeZone: string
  emailNotifications: boolean
  marketingEmails: boolean
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<Profile>({})
  const [settings, setSettings] = useState<Settings | null>(null)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const r = await fetch('/api/user/profile', { cache: 'no-store' })
        if (!r.ok) throw new Error('Failed to load')
        const j = await r.json()
        setProfile(j.profile ?? {})
        setSettings(j.settings ?? null)
        setRole(j.role ?? null)
      } catch (e: any) {
        setError(e.message ?? 'Failed to load')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div className="mx-auto max-w-3xl px-6 py-16">Loading…</div>
  if (error) return <div className="mx-auto max-w-3xl px-6 py-16 text-red-600">{error}</div>

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 grid gap-6">
      <section className="rounded-lg border border-foreground/10 p-6 bg-background/60">
        <h2 className="font-semibold mb-4">Profile</h2>
        <p className="mb-4 text-sm text-foreground/70">Account type: <span className="font-medium">{role === 'brand' ? 'Brand' : role === 'creator' ? 'Creator/Influencer' : '—'}</span></p>
        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={async (e) => {
            e.preventDefault()
            setError(null)
            const res = await fetch('/api/user/profile', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(profile),
            })
            if (!res.ok) setError('Failed to save profile')
          }}
        >
          <div>
            <label className="block text-sm mb-1">Company</label>
            <input className="border rounded w-full px-3 py-2" value={profile.companyName ?? ''} onChange={(e)=>setProfile(p=>({...p, companyName: e.target.value}))} />
          </div>
          <div>
            <label className="block text-sm mb-1">VAT ID</label>
            <input className="border rounded w-full px-3 py-2" value={profile.vatId ?? ''} onChange={(e)=>setProfile(p=>({...p, vatId: e.target.value}))} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Address</label>
            <input className="border rounded w-full px-3 py-2" value={profile.address ?? ''} onChange={(e)=>setProfile(p=>({...p, address: e.target.value}))} />
          </div>
          <div>
            <label className="block text-sm mb-1">Country</label>
            <input className="border rounded w-full px-3 py-2" value={profile.country ?? ''} onChange={(e)=>setProfile(p=>({...p, country: e.target.value}))} />
          </div>
          <div className="md:col-span-2">
            <button className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90" type="submit">Save profile</button>
          </div>
        </form>
      </section>

      <section className="rounded-lg border border-foreground/10 p-6 bg-background/60">
        <h2 className="font-semibold mb-4">Settings</h2>
        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={async (e) => {
            e.preventDefault()
            setError(null)
            const res = await fetch('/api/user/settings', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(settings ?? {}),
            })
            if (!res.ok) setError('Failed to save settings')
          }}
        >
          <div>
            <label className="block text-sm mb-1">Theme</label>
            <select className="border rounded w-full px-3 py-2" value={settings?.theme ?? 'system'} onChange={(e)=>setSettings(s=>({ ...(s ?? {} as any), theme: e.target.value }))}>
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Language</label>
            <input className="border rounded w-full px-3 py-2" value={settings?.language ?? 'en'} onChange={(e)=>setSettings(s=>({ ...(s ?? {} as any), language: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm mb-1">Region</label>
            <input className="border rounded w-full px-3 py-2" value={settings?.region ?? 'eu'} onChange={(e)=>setSettings(s=>({ ...(s ?? {} as any), region: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm mb-1">Time zone</label>
            <input className="border rounded w-full px-3 py-2" value={settings?.timeZone ?? 'UTC'} onChange={(e)=>setSettings(s=>({ ...(s ?? {} as any), timeZone: e.target.value }))} />
          </div>
          <div>
            <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={!!settings?.emailNotifications} onChange={(e)=>setSettings(s=>({ ...(s ?? {} as any), emailNotifications: e.target.checked }))} /> Email notifications</label>
          </div>
          <div>
            <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={!!settings?.marketingEmails} onChange={(e)=>setSettings(s=>({ ...(s ?? {} as any), marketingEmails: e.target.checked }))} /> Marketing emails</label>
          </div>
          <div className="md:col-span-2">
            <button className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90" type="submit">Save settings</button>
          </div>
        </form>
      </section>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  )
}


