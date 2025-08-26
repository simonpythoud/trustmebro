import Link from 'next/link'
import { cookies } from 'next/headers'
import { getT, normalizeLocale } from '@/lib/i18n'


export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
	const sp = await searchParams
	const rawLang = Array.isArray(sp?.lang) ? sp.lang[0] : sp?.lang
	const cookieStore = await cookies()
	const cookieLang = cookieStore.get('lang')?.value
	const locale = normalizeLocale(rawLang || cookieLang || 'en')
	const t = getT(locale)
	const rawRegion = Array.isArray(sp?.region) ? sp.region[0] : sp?.region
	const cookieRegion = cookieStore.get('region')?.value
	const region = (rawRegion || cookieRegion) === 'us' ? 'us' : 'eu'
	const compBullet = region === 'us' ? t('home.whyComplianceUS') : t('home.whyComplianceEU')
	const currencyTile = region === 'us' ? 'USD' : 'CHF'
	return (
		<main>
			{/* Hero */}
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(800px_400px_at_-10%_20%,rgba(16,185,129,0.18),transparent)]" />
				<div className="mx-auto max-w-6xl px-6 py-20">
					<div className="flex flex-col items-start gap-6">
						<span className="inline-flex items-center rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs tracking-wide">{t('home.tagline')}</span>
						<h1 className="text-4xl md:text-6xl font-semibold leading-tight">{t('home.heroTitle')}</h1>
						<p className="max-w-2xl text-base md:text-lg text-foreground/80">{t('home.heroDesc')}</p>
						<div className="flex flex-wrap items-center gap-3">
							<Link href="/signin" className="inline-flex items-center justify-center rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition">{t('home.ctaPrimary')}</Link>
							<Link href="/contracts/new" className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-5 py-3 text-sm font-medium hover:bg-foreground/5 transition">{t('home.ctaSecondary')}</Link>
						</div>
						<div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-foreground/60">
							<div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />{t('home.pillEscrow')}</div>
							<div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-indigo-500" />{t('home.pillAutoApprove')}</div>
							<div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-amber-500" />{t('home.pillAdmin')}</div>
						</div>
					</div>
				</div>
			</section>

			{/* Trust Bar */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
					<div>
						<div className="font-semibold">{t('home.trust1Title')}</div>
						<p className="text-foreground/70">{t('home.trust1Desc')}</p>
					</div>
					<div>
						<div className="font-semibold">{t('home.trust2Title')}</div>
						<p className="text-foreground/70">{t('home.trust2Desc')}</p>
					</div>
					<div>
						<div className="font-semibold">{t('home.trust3Title')}</div>
						<p className="text-foreground/70">{t('home.trust3Desc')}</p>
					</div>
					<div>
						<div className="font-semibold">{t('home.trust4Title')}</div>
						<p className="text-foreground/70">{t('home.trust4Desc')}</p>
					</div>
				</div>
			</section>

			{/* How it works */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-16">
					<h2 className="text-2xl md:text-3xl font-semibold">{t('home.howTitle')}</h2>
					<div className="mt-8 grid gap-6 md:grid-cols-3">
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60">
							<div className="text-sm font-semibold">{t('home.how1Title')}</div>
							<p className="mt-2 text-foreground/70">{t('home.how1Desc')}</p>
						</div>
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60">
							<div className="text-sm font-semibold">{t('home.how2Title')}</div>
							<p className="mt-2 text-foreground/70">{t('home.how2Desc')}</p>
						</div>
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60">
							<div className="text-sm font-semibold">{t('home.how3Title')}</div>
							<p className="mt-2 text-foreground/70">{t('home.how3Desc')}</p>
						</div>
					</div>
				</div>
			</section>

			{/* Value props */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-16">
					<div className="grid gap-10 md:grid-cols-2 items-center">
						<div className="space-y-4">
							<h3 className="text-xl md:text-2xl font-semibold">{t('home.whyTitle')}</h3>
							<ul className="space-y-3 text-foreground/80 text-sm">
								<li>{t('home.whyBullet1')}</li>
								<li>{t('home.whyBullet2')}</li>
								<li>{t('home.whyBullet3')}</li>
								<li>{compBullet}</li>
							</ul>
							<div className="pt-2">
								<Link href="/signin" className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:opacity-95 transition">{t('home.whyCta')}</Link>
							</div>
						</div>
						<div className="rounded-xl border border-foreground/10 bg-background/60 p-6">
							<div className="grid grid-cols-2 gap-4 text-center">
								<div className="rounded-lg border border-foreground/10 p-4">
									<div className="text-3xl font-semibold">48h</div>
									<div className="text-xs text-foreground/60">{t('home.kpiAutoApprove')}</div>
								</div>
								<div className="rounded-lg border border-foreground/10 p-4">
									<div className="text-3xl font-semibold">100%</div>
									<div className="text-xs text-foreground/60">{t('home.kpiTraceability')}</div>
								</div>
								<div className="rounded-lg border border-foreground/10 p-4">
									<div className="text-3xl font-semibold">2x</div>
									<div className="text-xs text-foreground/60">{t('home.kpiMutual')}</div>
								</div>
								<div className="rounded-lg border border-foreground/10 p-4">
									<div className="text-3xl font-semibold"><span className="align-top">{currencyTile}</span></div>
									<div className="text-xs text-foreground/60">{t('home.kpiCurrency')}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Security */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-16">
					<h3 className="text-xl md:text-2xl font-semibold">{t('home.secTitle')}</h3>
					<div className="mt-6 grid gap-6 md:grid-cols-3">
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<div className="font-semibold">{t('home.sec1Title')}</div>
							<p className="mt-1 text-foreground/70">{t('home.sec1Desc')}
							</p>
						</div>
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<div className="font-semibold">{t('home.sec2Title')}</div>
							<p className="mt-1 text-foreground/70">{t('home.sec2Desc')}
							</p>
						</div>
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<div className="font-semibold">{t('home.sec3Title')}</div>
							<p className="mt-1 text-foreground/70">{t('home.sec3Desc')}</p>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-16">
					<h3 className="text-xl md:text-2xl font-semibold">{t('home.testiTitle')}</h3>
					<div className="mt-6 grid gap-6 md:grid-cols-3">
						<figure className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<blockquote className="text-foreground/80">{t('home.testi1Quote')}</blockquote>
							<figcaption className="mt-3 text-foreground/60">{t('home.testi1By')}</figcaption>
						</figure>
						<figure className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<blockquote className="text-foreground/80">{t('home.testi2Quote')}</blockquote>
							<figcaption className="mt-3 text-foreground/60">{t('home.testi2By')}</figcaption>
						</figure>
						<figure className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<blockquote className="text-foreground/80">{t('home.testi3Quote')}</blockquote>
							<figcaption className="mt-3 text-foreground/60">{t('home.testi3By')}</figcaption>
						</figure>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-16 text-center">
					<h3 className="text-2xl md:text-3xl font-semibold">{t('home.finalTitle')}</h3>
					<p className="mt-3 text-foreground/70 max-w-2xl mx-auto">{t('home.finalDesc')}</p>
					<div className="mt-6 flex justify-center gap-3">
						<Link href="/signin" className="inline-flex items-center justify-center rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition">{t('home.finalPrimary')}</Link>
						<Link href="/contracts/new" className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-5 py-3 text-sm font-medium hover:bg-foreground/5 transition">{t('home.finalSecondary')}</Link>
					</div>
				</div>
			</section>
		</main>
	)
}
