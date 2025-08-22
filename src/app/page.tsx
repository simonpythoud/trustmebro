import Link from 'next/link'

export default async function Home({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
	const sp = searchParams ?? {}
	const rawLang = Array.isArray(sp.lang) ? sp.lang[0] : sp.lang
	const lang = rawLang === 'fr' ? 'fr' : 'en'
	const copy = {
		en: {
			tagline: 'Built for brands and creators',
			heroTitle: 'Secure collaborations that actually deliver',
			heroDesc: 'TrustMeBro is the escrow + contract layer for influencer collaborations. Both sides deposit, deliverables are verified, and payouts are automatic.',
			ctaPrimary: 'Get started — it’s free',
			ctaSecondary: 'Create a contract',
			pillEscrow: 'Escrow-backed',
			pillAutoApprove: 'Auto-approve in 48h',
			pillAdmin: 'Admin resolution',
			trust1Title: 'Dual-deposit escrow',
			trust1Desc: 'Both brand and creator commit funds to start.',
			trust2Title: 'Legally-binding contract',
			trust2Desc: 'Digital signatures with verifiable audit trail.',
			trust3Title: 'Auto payouts',
			trust3Desc: 'Approve or auto-approve after 48h.',
			trust4Title: 'Dispute resolution',
			trust4Desc: 'Admin can release, refund or split.',
			howTitle: 'How it works',
			how1Title: '1) Agree the brief',
			how1Desc: 'Create a contract with deliverables, deadline and deposits.',
			how2Title: '2) Fund the escrow',
			how2Desc: 'Brand funds budget, both sides fund deposits. Work starts.',
			how3Title: '3) Deliver & release',
			how3Desc: 'Creator submits the link. Brand approves (or auto-approve), payouts trigger.',
			whyTitle: 'Why TrustMeBro',
			whyBullet1: '• Zero ghosting: funds are committed up-front.',
			whyBullet2: '• Transparent states: every step logged as an event.',
			whyBullet3: '• Fair outcomes: cancellations and disputes handled cleanly.',
			whyBullet4: '• Built for EU/CH compliance and GDPR.',
			whyCta: 'Create your first contract in minutes',
			kpiAutoApprove: 'Auto-approve window',
			kpiTraceability: 'Funds traceability',
			kpiMutual: 'Mutual deposits',
			kpiCurrency: 'Currency-first (v1)',
			secTitle: 'Security & compliance',
			sec1Title: 'CSP + HSTS',
			sec1Desc: 'Strict security headers and HTTPS-only.',
			sec2Title: 'Audit trail',
			sec2Desc: 'Every transition and payout is logged for proof.',
			sec3Title: 'KYC-ready',
			sec3Desc: 'Stripe Connect onboarding for payouts and compliance.',
			testiTitle: 'What early users say',
			testi1Quote: '“No more chasing invoices. We approve and the money moves.”',
			testi1By: '— Brand owner, CH',
			testi2Quote: '“Deposits make everyone serious. It’s finally fair.”',
			testi2By: '— Creator, FR',
			testi3Quote: '“The contract + escrow combo is exactly what was missing.”',
			testi3By: '— Agency, EU',
			finalTitle: 'Ready to collaborate with confidence?',
			finalDesc: 'Spin up a contract, fund the escrow, and protect both sides. It takes 2 minutes.',
			finalPrimary: 'Sign up / Sign in',
			finalSecondary: 'Draft a contract',
		},
		fr: {
			tagline: 'Pensé pour les marques et les créateurs',
			heroTitle: 'Des collaborations sécurisées qui aboutissent vraiment',
			heroDesc: 'TrustMeBro est la couche contrat + escrow pour les collaborations d’influence. Les deux parties déposent, les livrables sont vérifiés et les paiements sont automatiques.',
			ctaPrimary: 'Commencer — c’est gratuit',
			ctaSecondary: 'Créer un contrat',
			pillEscrow: 'Garanti par un escrow',
			pillAutoApprove: 'Approbation auto en 48h',
			pillAdmin: 'Arbitrage admin',
			trust1Title: 'Escrow à dépôts mutuels',
			trust1Desc: 'La marque et le créateur engagent des fonds pour démarrer.',
			trust2Title: 'Contrat juridiquement contraignant',
			trust2Desc: 'Signatures électroniques avec piste d’audit vérifiable.',
			trust3Title: 'Payouts automatiques',
			trust3Desc: 'Approbation ou auto‑approbation après 48h.',
			trust4Title: 'Gestion des litiges',
			trust4Desc: 'L’admin peut libérer, rembourser ou répartir.',
			howTitle: 'Comment ça marche',
			how1Title: '1) Validez le brief',
			how1Desc: 'Créez un contrat avec livrables, deadline et dépôts.',
			how2Title: '2) Alimentez l’escrow',
			how2Desc: 'La marque dépose le budget, chaque partie verse sa caution. Le travail commence.',
			how3Title: '3) Livrez & libérez',
			how3Desc: 'Le créateur soumet le lien. La marque approuve (ou auto‑approbation), les paiements se déclenchent.',
			whyTitle: 'Pourquoi TrustMeBro',
			whyBullet1: '• Plus de ghosting : les fonds sont engagés dès le départ.',
			whyBullet2: '• États transparents : chaque étape est journalisée.',
			whyBullet3: '• Résultats équitables : annulations et litiges gérés proprement.',
			whyBullet4: '• Conçu pour la conformité UE/CH et RGPD.',
			whyCta: 'Créez votre premier contrat en quelques minutes',
			kpiAutoApprove: 'Fenêtre d’auto‑approbation',
			kpiTraceability: 'Traçabilité des fonds',
			kpiMutual: 'Dépôts mutuels',
			kpiCurrency: 'Devise par défaut (v1)',
			secTitle: 'Sécurité & conformité',
			sec1Title: 'CSP + HSTS',
			sec1Desc: 'En‑têtes de sécurité stricts et HTTPS uniquement.',
			sec2Title: 'Piste d’audit',
			sec2Desc: 'Chaque transition et paiement est tracé.',
			sec3Title: 'Prêt pour le KYC',
			sec3Desc: 'Onboarding Stripe Connect pour les paiements et la conformité.',
			testiTitle: 'Ils témoignent',
			testi1Quote: '« Fini la chasse aux factures. On approuve et l’argent part. »',
			testi1By: '— Dirigeant de marque, CH',
			testi2Quote: '« Les dépôts responsabilisent tout le monde. C’est enfin équitable. »',
			testi2By: '— Créateur, FR',
			testi3Quote: '« Le combo contrat + escrow, c’est exactement ce qui manquait. »',
			testi3By: '— Agence, UE',
			finalTitle: 'Prêt à collaborer en toute confiance ?',
			finalDesc: 'Créez un contrat, alimentez l’escrow et protégez les deux parties. 2 minutes suffisent.',
			finalPrimary: 'Créer un compte / Se connecter',
			finalSecondary: 'Rédiger un contrat',
		},
	} as const
	const t = copy[lang]
	return (
		<main>
			{/* Hero */}
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(800px_400px_at_-10%_20%,rgba(16,185,129,0.18),transparent)]" />
				<div className="mx-auto max-w-6xl px-6 py-20">
					<div className="flex flex-col items-start gap-6">
						<span className="inline-flex items-center rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs tracking-wide">{t.tagline}</span>
						<h1 className="text-4xl md:text-6xl font-semibold leading-tight">{t.heroTitle}</h1>
						<p className="max-w-2xl text-base md:text-lg text-foreground/80">{t.heroDesc}</p>
						<div className="flex flex-wrap items-center gap-3">
							<Link href="/signin" className="inline-flex items-center justify-center rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition">{t.ctaPrimary}</Link>
							<Link href="/contracts/new" className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-5 py-3 text-sm font-medium hover:bg-foreground/5 transition">{t.ctaSecondary}</Link>
						</div>
						<div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-foreground/60">
							<div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />{t.pillEscrow}</div>
							<div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-indigo-500" />{t.pillAutoApprove}</div>
							<div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-amber-500" />{t.pillAdmin}</div>
						</div>
					</div>
				</div>
			</section>

			{/* Trust Bar */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
					<div>
						<div className="font-semibold">{t.trust1Title}</div>
						<p className="text-foreground/70">{t.trust1Desc}</p>
					</div>
					<div>
						<div className="font-semibold">{t.trust2Title}</div>
						<p className="text-foreground/70">{t.trust2Desc}</p>
					</div>
					<div>
						<div className="font-semibold">{t.trust3Title}</div>
						<p className="text-foreground/70">{t.trust3Desc}</p>
					</div>
					<div>
						<div className="font-semibold">{t.trust4Title}</div>
						<p className="text-foreground/70">{t.trust4Desc}</p>
					</div>
				</div>
			</section>

			{/* How it works */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-16">
					<h2 className="text-2xl md:text-3xl font-semibold">{t.howTitle}</h2>
					<div className="mt-8 grid gap-6 md:grid-cols-3">
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60">
							<div className="text-sm font-semibold">{t.how1Title}</div>
							<p className="mt-2 text-foreground/70">{t.how1Desc}</p>
						</div>
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60">
							<div className="text-sm font-semibold">{t.how2Title}</div>
							<p className="mt-2 text-foreground/70">{t.how2Desc}</p>
						</div>
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60">
							<div className="text-sm font-semibold">{t.how3Title}</div>
							<p className="mt-2 text-foreground/70">{t.how3Desc}</p>
						</div>
					</div>
				</div>
			</section>

			{/* Value props */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-16">
					<div className="grid gap-10 md:grid-cols-2 items-center">
						<div className="space-y-4">
							<h3 className="text-xl md:text-2xl font-semibold">{t.whyTitle}</h3>
							<ul className="space-y-3 text-foreground/80 text-sm">
								<li>{t.whyBullet1}</li>
								<li>{t.whyBullet2}</li>
								<li>{t.whyBullet3}</li>
								<li>{t.whyBullet4}</li>
							</ul>
							<div className="pt-2">
								<Link href="/signin" className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:opacity-95 transition">{t.whyCta}</Link>
							</div>
						</div>
						<div className="rounded-xl border border-foreground/10 bg-background/60 p-6">
							<div className="grid grid-cols-2 gap-4 text-center">
								<div className="rounded-lg border border-foreground/10 p-4">
									<div className="text-3xl font-semibold">48h</div>
									<div className="text-xs text-foreground/60">{t.kpiAutoApprove}</div>
								</div>
								<div className="rounded-lg border border-foreground/10 p-4">
									<div className="text-3xl font-semibold">100%</div>
									<div className="text-xs text-foreground/60">{t.kpiTraceability}</div>
								</div>
								<div className="rounded-lg border border-foreground/10 p-4">
									<div className="text-3xl font-semibold">2x</div>
									<div className="text-xs text-foreground/60">{t.kpiMutual}</div>
								</div>
								<div className="rounded-lg border border-foreground/10 p-4">
									<div className="text-3xl font-semibold"><span className="align-top">CHF</span></div>
									<div className="text-xs text-foreground/60">{t.kpiCurrency}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Security */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-16">
					<h3 className="text-xl md:text-2xl font-semibold">{t.secTitle}</h3>
					<div className="mt-6 grid gap-6 md:grid-cols-3">
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<div className="font-semibold">{t.sec1Title}</div>
							<p className="mt-1 text-foreground/70">{t.sec1Desc}
							</p>
						</div>
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<div className="font-semibold">{t.sec2Title}</div>
							<p className="mt-1 text-foreground/70">{t.sec2Desc}
							</p>
						</div>
						<div className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<div className="font-semibold">{t.sec3Title}</div>
							<p className="mt-1 text-foreground/70">{t.sec3Desc}</p>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-16">
					<h3 className="text-xl md:text-2xl font-semibold">{t.testiTitle}</h3>
					<div className="mt-6 grid gap-6 md:grid-cols-3">
						<figure className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<blockquote className="text-foreground/80">{t.testi1Quote}</blockquote>
							<figcaption className="mt-3 text-foreground/60">{t.testi1By}</figcaption>
						</figure>
						<figure className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<blockquote className="text-foreground/80">{t.testi2Quote}</blockquote>
							<figcaption className="mt-3 text-foreground/60">{t.testi2By}</figcaption>
						</figure>
						<figure className="rounded-lg border border-foreground/10 p-6 bg-background/60 text-sm">
							<blockquote className="text-foreground/80">{t.testi3Quote}</blockquote>
							<figcaption className="mt-3 text-foreground/60">{t.testi3By}</figcaption>
						</figure>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="border-t border-foreground/10">
				<div className="mx-auto max-w-6xl px-6 py-16 text-center">
					<h3 className="text-2xl md:text-3xl font-semibold">{t.finalTitle}</h3>
					<p className="mt-3 text-foreground/70 max-w-2xl mx-auto">{t.finalDesc}</p>
					<div className="mt-6 flex justify-center gap-3">
						<Link href="/signin" className="inline-flex items-center justify-center rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition">{t.finalPrimary}</Link>
						<Link href="/contracts/new" className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-5 py-3 text-sm font-medium hover:bg-foreground/5 transition">{t.finalSecondary}</Link>
					</div>
				</div>
			</section>
		</main>
	)
}
