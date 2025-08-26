import { cookies } from 'next/headers'
import { getT, normalizeLocale } from '@/lib/i18n'

export default async function ContactPage() {
	const cookieStore = await cookies()
	const locale = normalizeLocale(cookieStore.get('lang')?.value || 'en')
	const t = getT(locale)
	return (
		<main className="mx-auto max-w-3xl px-6 py-12 space-y-6">
			<h1 className="text-3xl font-semibold">{t('static.contact.title')}</h1>
			<p className="text-foreground/70">{t('static.contact.intro')}</p>
			<section className="grid gap-4 md:grid-cols-2 text-sm">
				<div className="rounded-lg border border-foreground/10 p-4">
					<div className="font-semibold">{t('static.contact.support')}</div>
					<p className="text-foreground/70">{t('static.contact.supportEmail')}</p>
				</div>
				<div className="rounded-lg border border-foreground/10 p-4">
					<div className="font-semibold">{t('static.contact.security')}</div>
					<p className="text-foreground/70">{t('static.contact.securityEmail')}</p>
				</div>
				<div className="rounded-lg border border-foreground/10 p-4">
					<div className="font-semibold">{t('static.contact.legal')}</div>
					<p className="text-foreground/70">{t('static.contact.legalEmail')}</p>
				</div>
				<div className="rounded-lg border border-foreground/10 p-4">
					<div className="font-semibold">{t('static.contact.press')}</div>
					<p className="text-foreground/70">{t('static.contact.pressEmail')}</p>
				</div>
			</section>
			<p className="text-foreground/60 text-xs">{t('static.contact.footer')}</p>
		</main>
	)
}


