"use client"
import { useEffect, useState } from 'react'
import { useI18n } from '@/lib/i18n-react'

type Profile = {
  companyName?: string | null
  vatId?: string | null
  address?: string | null
  country?: string | null
  searchable?: boolean
  socialTikTok?: string | null
  socialInstagram?: string | null
  socialYouTube?: string | null
  socialTwitter?: string | null
  socialLinkedIn?: string | null
  socialTwitch?: string | null
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
  const { t } = useI18n()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<Profile>({})
  const [settings, setSettings] = useState<Settings | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const r = await fetch('/api/user/profile', { cache: 'no-store', credentials: 'include' })
        if (!r.ok) throw new Error('Failed to load')
        const j = await r.json()
        setProfile(j.profile ?? {})
        setSettings(j.settings ?? null)
        setRole(j.role ?? null)
        setEmail(j.email ?? null)
      } catch (e: any) {
        setError(e.message ?? 'Failed to load')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div className="mx-auto max-w-3xl px-6 py-16">{t('profile.loading')}</div>
  if (error) return <div className="mx-auto max-w-3xl px-6 py-16 text-red-600">{error}</div>

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 grid gap-6">
      <section className="rounded-lg border border-foreground/10 p-6 bg-background/60">
        <h2 className="font-semibold mb-1">{t('profile.title')}</h2>
        <p className="text-sm text-foreground/70 mb-2">{t('profile.accountType')} <span className="font-medium">{role === 'brand' ? t('profile.brand') : role === 'creator' ? t('profile.creator') : '—'}</span></p>
        <p className="text-sm text-foreground/70"><span className="font-medium">{t('profile.email')}</span> {email ?? '—'}</p>
      </section>
      <section className="rounded-lg border border-foreground/10 p-6 bg-background/60">
        <h3 className="font-semibold mb-4">{t('profile.companySection')}</h3>
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
            if (!res.ok) setError(t('profile.failedSaveProfile'))
          }}
        >
          <div>
            <label className="block text-sm mb-1">{t('profile.company')}</label>
            <input className="border rounded w-full px-3 py-2" value={profile.companyName ?? ''} onChange={(e)=>setProfile(p=>({...p, companyName: e.target.value}))} />
          </div>
          <div>
            <label className="block text-sm mb-1">{t('profile.vatId')}</label>
            <input className="border rounded w-full px-3 py-2" value={profile.vatId ?? ''} onChange={(e)=>setProfile(p=>({...p, vatId: e.target.value}))} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">{t('profile.address')}</label>
            <input className="border rounded w-full px-3 py-2" value={profile.address ?? ''} onChange={(e)=>setProfile(p=>({...p, address: e.target.value}))} />
          </div>
          <div>
            <label className="block text-sm mb-1">{t('profile.country')}</label>
            <input className="border rounded w-full px-3 py-2" value={profile.country ?? ''} onChange={(e)=>setProfile(p=>({...p, country: e.target.value}))} />
          </div>
          <div>
            <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={profile.searchable ?? true} onChange={(e)=>setProfile(p=>({...p, searchable: e.target.checked}))} /> {t('profile.searchable')}</label>
          </div>
          <div className="md:col-span-2">
            <button className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90" type="submit">{t('profile.saveProfile')}</button>
          </div>
        </form>
      </section>

      <section className="rounded-lg border border-foreground/10 p-6 bg-background/60">
        <h3 className="font-semibold mb-4">{t('profile.socials')}</h3>
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
            if (!res.ok) setError(t('profile.failedSaveProfile'))
          }}
        >
          <div>
            <label className="block text-sm mb-1">TikTok</label>
            <input className="border rounded w-full px-3 py-2" placeholder="@handle or URL" value={profile.socialTikTok ?? ''} onChange={(e)=>setProfile(p=>({...p, socialTikTok: e.target.value}))} />
          </div>
          <div>
            <label className="block text-sm mb-1">Instagram</label>
            <input className="border rounded w-full px-3 py-2" placeholder="@handle or URL" value={profile.socialInstagram ?? ''} onChange={(e)=>setProfile(p=>({...p, socialInstagram: e.target.value}))} />
          </div>
          <div>
            <label className="block text-sm mb-1">YouTube</label>
            <input className="border rounded w-full px-3 py-2" placeholder="Channel URL" value={profile.socialYouTube ?? ''} onChange={(e)=>setProfile(p=>({...p, socialYouTube: e.target.value}))} />
          </div>
          <div>
            <label className="block text-sm mb-1">Twitter / X</label>
            <input className="border rounded w-full px-3 py-2" placeholder="@handle or URL" value={profile.socialTwitter ?? ''} onChange={(e)=>setProfile(p=>({...p, socialTwitter: e.target.value}))} />
          </div>
          <div>
            <label className="block text-sm mb-1">LinkedIn</label>
            <input className="border rounded w-full px-3 py-2" placeholder="Profile or Company URL" value={profile.socialLinkedIn ?? ''} onChange={(e)=>setProfile(p=>({...p, socialLinkedIn: e.target.value}))} />
          </div>
          <div>
            <label className="block text-sm mb-1">Twitch</label>
            <input className="border rounded w-full px-3 py-2" placeholder="Channel URL" value={profile.socialTwitch ?? ''} onChange={(e)=>setProfile(p=>({...p, socialTwitch: e.target.value}))} />
          </div>
          <div className="md:col-span-2">
            <button className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90" type="submit">{t('profile.saveSocials')}</button>
          </div>
        </form>
        <div className="mt-4">
          <button
            className="inline-flex items-center rounded-md border border-foreground/20 px-4 py-2 text-sm font-medium hover:bg-foreground/5"
            onClick={() => alert(t('profile.verifySoon'))}
          >
            {t('profile.verifyButton')}
          </button>
        </div>
      </section>

      <section className="rounded-lg border border-foreground/10 p-6 bg-background/60">
        <h3 className="font-semibold mb-4">{t('profile.settings')}</h3>
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
            if (!res.ok) setError(t('profile.failedSaveSettings'))
          }}
        >
          <div>
            <label className="block text-sm mb-1">{t('profile.theme')}</label>
            <select className="border rounded w-full px-3 py-2" value={settings?.theme ?? 'system'} onChange={(e)=>setSettings(s=>({ ...(s ?? {} as any), theme: e.target.value }))}>
              <option value="system">{t('profile.themeSystem')}</option>
              <option value="light">{t('profile.themeLight')}</option>
              <option value="dark">{t('profile.themeDark')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">{t('profile.language')}</label>
            <input className="border rounded w-full px-3 py-2" value={settings?.language ?? 'en'} onChange={(e)=>setSettings(s=>({ ...(s ?? {} as any), language: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm mb-1">{t('profile.region')}</label>
            <input className="border rounded w-full px-3 py-2" value={settings?.region ?? 'eu'} onChange={(e)=>setSettings(s=>({ ...(s ?? {} as any), region: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm mb-1">{t('profile.timeZone')}</label>
            <input className="border rounded w-full px-3 py-2" value={settings?.timeZone ?? 'UTC'} onChange={(e)=>setSettings(s=>({ ...(s ?? {} as any), timeZone: e.target.value }))} />
          </div>
          <div>
            <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={!!settings?.emailNotifications} onChange={(e)=>setSettings(s=>({ ...(s ?? {} as any), emailNotifications: e.target.checked }))} /> {t('profile.emailNotifications')}</label>
          </div>
          <div>
            <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={!!settings?.marketingEmails} onChange={(e)=>setSettings(s=>({ ...(s ?? {} as any), marketingEmails: e.target.checked }))} /> {t('profile.marketingEmails')}</label>
          </div>
          <div className="md:col-span-2">
            <button className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90" type="submit">{t('profile.saveSettings')}</button>
          </div>
        </form>
      </section>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  )
}


