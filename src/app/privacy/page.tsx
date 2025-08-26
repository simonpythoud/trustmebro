import { cookies } from 'next/headers'
import { getT, normalizeLocale } from '@/lib/i18n'

export default async function PrivacyPage() {
	const cookieStore = await cookies()
	const locale = normalizeLocale(cookieStore.get('lang')?.value || 'en')
	const t = getT(locale)
	return (
		<main className="mx-auto max-w-3xl px-6 py-12 space-y-6">
			<h1 className="text-3xl font-semibold">{t('static.privacy.title')}</h1>
			<p className="text-foreground/70">{t('static.privacy.intro')}</p>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">{t('static.privacy.data')}</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>{t('static.privacy.data1')}</li>
					<li>{t('static.privacy.data2')}</li>
					<li>{t('static.privacy.data3')}</li>
					<li>{t('static.privacy.data4')}</li>
				</ul>
			</section>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">{t('static.privacy.purpose')}</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>{t('static.privacy.purpose1')}</li>
					<li>{t('static.privacy.purpose2')}</li>
					<li>{t('static.privacy.purpose3')}</li>
				</ul>
			</section>
			<section className="space-y-3 text-sm">
				<h2 className="text-xl font-semibold">{t('static.privacy.retention')}</h2>
				<ul className="list-disc pl-5 space-y-1">
					<li>{t('static.privacy.retention1')}</li>
					<li>{t('static.privacy.retention2')}</li>
				</ul>
			</section>
			<p className="text-foreground/60 text-sm">{t('static.privacy.footer')}</p>
		</main>
	)
}


