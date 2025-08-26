"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Locale } from '@/lib/i18n'

type Region = 'eu' | 'us'

type Combo = { group: 'Europe' | 'North America' | 'Asia'; region: Region; items: Array<{ code: Locale; label: string; icon: string }> }

const COMBOS: Combo[] = [
  { group: 'Europe', region: 'eu', items: [
    { code: 'en', label: 'EN', icon: '🇬🇧' },
    { code: 'fr', label: 'FR', icon: '🇫🇷' },
    { code: 'de', label: 'DE', icon: '🇩🇪' },
    { code: 'it', label: 'IT', icon: '🇮🇹' },
    { code: 'es', label: 'ES', icon: '🇪🇸' },
  ]},
  { group: 'North America', region: 'us', items: [
    { code: 'en', label: 'EN', icon: '🇺🇸' },
    { code: 'fr', label: 'FR', icon: '🇨🇦' },
    { code: 'es', label: 'ES', icon: '🇲🇽' },
  ]},
  { group: 'Asia', region: 'eu', items: [ // keep EU rules for now except CN
    { code: 'en', label: 'EN', icon: '🇸🇬' },
    { code: 'cn', label: 'CN', icon: '🇨🇳' },
  ]},
]

export function LanguageRegionMenu({ locale, region }: { locale: Locale; region: Region }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const setLang = async (code: string) => {
    try {
      await fetch('/api/lang', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lang: code }) })
      router.refresh()
    } finally {
      setOpen(false)
    }
  }

  const setRegion = async (code: Region) => {
    try {
      await fetch('/api/region', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ region: code }) })
      router.refresh()
    } finally {
      setOpen(false)
    }
  }

  return (
    <div className="relative z-[60]">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center rounded-md border border-foreground/20 px-3 py-1.5 text-sm hover:bg-foreground/5"
      >
        <span className="mr-2">{region === 'us' ? '🇺🇸' : '🇪🇺'}</span>
        <span className="mr-1">{region === 'us' ? 'US' : 'EU'}</span>
        <span className="opacity-60">/</span>
        <span className="ml-1">{locale.toUpperCase()}</span>
      </button>
      {open && (
        <div className="fixed right-4 top-14 w-64 rounded-md border border-foreground/10 bg-background/95 shadow-2xl backdrop-blur p-2 z-[9999]">
          {COMBOS.map((group) => (
            <div key={group.group} className="mb-2 last:mb-0">
              <div className="px-2 py-1 text-xs uppercase tracking-wide text-foreground/60">{group.group}</div>
              <div className="grid grid-cols-3 gap-1 p-1">
                {group.items.map((item) => (
                  <button
                    key={item.code}
                    onClick={async () => { await setRegion(group.region); await setLang(item.code) }}
                    className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded border border-transparent ${region===group.region && locale===item.code ? 'bg-foreground/10 border-foreground/20' : 'hover:bg-foreground/5'}`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


