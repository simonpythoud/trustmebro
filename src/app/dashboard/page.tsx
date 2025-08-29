"use client"
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { StateBadge } from '../components/StateBadge'
import ConversionTabs from '../components/ConversionTabs'
import { useI18n } from '@/lib/i18n-react'

export default function DashboardPage() {
  const { t } = useI18n()
  const [items, setItems] = useState<any[] | null>(null)
  const [unauthorized, setUnauthorized] = useState(false)
  const [sortBy, setSortBy] = useState<'newest'|'oldest'|'budgetHigh'|'budgetLow'>('newest')
  const [stateFilter, setStateFilter] = useState<string>('all')
  useEffect(() => {
    let mounted = true
    fetch('/api/contracts', { cache: 'no-store', credentials: 'include' })
      .then(async (r) => {
        if (!mounted) return
        if (r.status === 401) { setUnauthorized(true); setItems([]); return }
        if (!r.ok) { setItems([]); return }
        setItems(await r.json())
      })
      .catch(() => mounted && setItems([]))
    return () => { mounted = false }
  }, [])
  const displayed = useMemo(() => {
    if (!Array.isArray(items)) return []
    let list = [...items]
    if (stateFilter !== 'all') list = list.filter((c) => c.state === stateFilter)
    switch (sortBy) {
      case 'oldest':
        list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case 'budgetHigh':
        list.sort((a, b) => b.budgetCents - a.budgetCents)
        break
      case 'budgetLow':
        list.sort((a, b) => a.budgetCents - b.budgetCents)
        break
      default:
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
    return list
  }, [items, sortBy, stateFilter])

  function displayName(u: any, kind: 'brand' | 'creator') {
    if (!u) return kind === 'brand' ? 'Brand' : 'Creator'
    const company = u.profile?.companyName?.trim()
    const name = u.name?.trim()
    const email = u.email
    return company || name || email || (kind === 'brand' ? 'Brand' : 'Creator')
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold">{t('dashboard.title')}</h1>
        <Link data-testid="create-contract" href="/contracts/new" className="ml-auto inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">{t('dashboard.create')}</Link>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-medium">{t('dashboard.contractsTitle')}</h2>
        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm text-foreground/70" htmlFor="filter-state">{t('dashboard.filter')}</label>
          <select id="filter-state" className="rounded-md border border-foreground/20 bg-background/60 px-2 py-1 text-sm" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
            <option value="all">{t('dashboard.filterAll')}</option>
            {Array.from(new Set(items?.map((i) => i.state) ?? [])).map((st) => (
              <option key={st} value={st}>{t(`state.${st}`)}</option>
            ))}
          </select>
          <label className="ml-3 text-sm text-foreground/70" htmlFor="sort-by">{t('dashboard.sort')}</label>
          <select id="sort-by" className="rounded-md border border-foreground/20 bg-background/60 px-2 py-1 text-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
            <option value="newest">{t('dashboard.sortNewest')}</option>
            <option value="oldest">{t('dashboard.sortOldest')}</option>
            <option value="budgetHigh">{t('dashboard.sortBudgetHigh')}</option>
            <option value="budgetLow">{t('dashboard.sortBudgetLow')}</option>
          </select>
        </div>
      </div>

      {items === null ? (
        <div className="mt-8 text-sm text-foreground/60">{t('dashboard.loading')}</div>
      ) : items.length === 0 ? (
        <>
          {unauthorized ? (
            <div className="mt-4 rounded-md border border-amber-300/50 bg-amber-50 text-amber-900 px-4 py-2 text-sm">
              {t('dashboard.unauthorized', { signin: '' })} <Link href="/signin" className="underline">{t('dashboard.unauthorizedLink')}</Link>
            </div>
          ) : (
            <div className="mt-4 rounded-md border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm">
              {t('dashboard.empty', { create: '' })} <Link href="/contracts/new" className="underline">{t('dashboard.emptyLink')}</Link>
            </div>
          )}

          <section className="mt-8 grid gap-6">
            <div className="rounded-lg border border-foreground/10 p-6 bg-background/60">
              <h2 className="text-xl font-semibold">{t('dashboard.whatTitle')}</h2>
              <ul className="mt-4 grid gap-2 text-sm text-foreground/80">
                <li>{t('dashboard.what1')}</li>
                <li>{t('dashboard.what2')}</li>
                <li>{t('dashboard.what3')}</li>
                <li>{t('dashboard.what4')}</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/signup" className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">{t('dashboard.ctaCreateAccount')}</Link>
                <Link href="/contracts/new" className="inline-flex items-center rounded-md border border-foreground/20 px-4 py-2 text-sm hover:bg-foreground/5">{t('dashboard.ctaDraft')}</Link>
              </div>
            </div>

            <div className="rounded-lg border border-foreground/10 p-6 bg-background/60">
              <ConversionTabs
                brand={(
                  <div className="grid gap-3 text-sm">
                    <div>
                      <div className="font-medium">{t('dashboard.forBrands')}</div>
                      <ul className="mt-2 space-y-1 text-foreground/80">
                        <li>{t('dashboard.brand1')}</li>
                        <li>{t('dashboard.brand2')}</li>
                        <li>{t('dashboard.brand3')}</li>
                        <li>{t('dashboard.brand4')}</li>
                      </ul>
                    </div>
                  </div>
                )}
                creator={(
                  <div className="grid gap-3 text-sm">
                    <div>
                      <div className="font-medium">{t('dashboard.forCreators')}</div>
                      <ul className="mt-2 space-y-1 text-foreground/80">
                        <li>{t('dashboard.creator1')}</li>
                        <li>{t('dashboard.creator2')}</li>
                        <li>{t('dashboard.creator3')}</li>
                        <li>{t('dashboard.creator4')}</li>
                      </ul>
                    </div>
                  </div>
                )}
              />
            </div>
          </section>
        </>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {displayed.map((c) => (
            <Link key={c.id} href={`/contracts/${c.id}`} className="rounded-lg border border-foreground/10 p-5 hover:bg-foreground/5 transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-foreground/60">#{c.id.slice(0,6)}</div>
                  <div className="mt-1 font-medium text-lg">{c.title}</div>
                  <div className="mt-1 text-sm text-foreground/70">{displayName(c.brand, 'brand')} <span className="mx-1">↔</span> {displayName(c.creator, 'creator')}</div>
                  <div className="text-sm text-foreground/60">CHF {(c.budgetCents/100).toFixed(2)}</div>
                </div>
                <span data-testid={`state-${c.state}`}><StateBadge state={c.state} label={t(`state.${c.state}`)} /></span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}


