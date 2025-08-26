import { cookies } from 'next/headers'
import { getT, normalizeLocale } from '@/lib/i18n'

export default async function StatusPage() {
	const cookieStore = await cookies()
	const locale = normalizeLocale(cookieStore.get('lang')?.value || 'en')
	const t = getT(locale)
	return (
		<main className="mx-auto max-w-3xl px-6 py-12 space-y-6">
			<h1 className="text-3xl font-semibold">{t('static.status.title')}</h1>
			<p className="text-foreground/70">{t('static.status.intro')}</p>
			<section className="rounded-lg border border-foreground/10 p-4 text-sm">
				<div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-emerald-500" /> {t('static.status.operational')}</div>
				<p className="mt-2 text-foreground/60">{t('static.status.placeholder')}</p>
			</section>
		</main>
	)
}


