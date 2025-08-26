import { cookies } from 'next/headers'
import { getT, normalizeLocale } from '@/lib/i18n'

export default async function SecurityPage() {
	const cookieStore = await cookies()
	const locale = normalizeLocale(cookieStore.get('lang')?.value || 'en')
	const t = getT(locale)
	return (
		<main className="mx-auto max-w-3xl px-6 py-12 space-y-6">
			<h1 className="text-3xl font-semibold">{t('static.security.title')}</h1>
			<p className="text-foreground/70">{t('static.security.intro')}</p>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">{t('static.security.headers')}</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>{t('static.security.headers1')}</li>
					<li>{t('static.security.headers2')}</li>
				</ul>
			</section>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">{t('static.security.auth')}</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>{t('static.security.auth1')}</li>
					<li>{t('static.security.auth2')}</li>
				</ul>
			</section>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">{t('static.security.payments')}</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>{t('static.security.payments1')}</li>
				</ul>
			</section>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">{t('static.security.data')}</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>{t('static.security.data1')}</li>
					<li>{t('static.security.data2')}</li>
				</ul>
			</section>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">{t('static.security.observability')}</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>{t('static.security.observability1')}</li>
				</ul>
			</section>
			<p className="text-foreground/60 text-sm">{t('static.security.footer')}</p>
		</main>
	)
}


