import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { SignOutButton } from "./components/SignOutButton";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n-react";
import { getT, normalizeLocale } from "@/lib/i18n";
import { LanguageRegionMenu } from "./components/LanguageRegionMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const locale = normalizeLocale(cookieStore.get('lang')?.value || 'en')
  const t = getT(locale)
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  const cookieStore = await cookies()
  const locale = normalizeLocale(cookieStore.get('lang')?.value || 'en')
  const t = getT(locale)
  const cookieRegion = cookieStore.get('region')?.value
  const region = (cookieRegion === 'us' || cookieRegion === 'ca' || cookieRegion === 'mx' || cookieRegion === 'apac' || cookieRegion === 'latam' || cookieRegion === 'mena') ? (cookieRegion as 'us'|'ca'|'mx'|'apac'|'latam'|'mena') : 'eu'
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider locale={locale}>
          <header className="sticky top-0 z-[2000] border-b border-foreground/10 bg-background/80 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center gap-3 sm:gap-6 overflow-x-auto overflow-y-visible">
              <Link href="/" className="flex items-center gap-2">
                <img src="/globe.svg" alt="TrustMeBro" className="h-5 w-5" />
                <span className="text-sm font-semibold">{t('nav.brand')}</span>
              </Link>
              <nav className="ml-auto flex items-center gap-3 sm:gap-4 text-sm whitespace-nowrap">
                <Link href="/" className="hover:underline hidden sm:inline">{t('nav.home')}</Link>
                <Link href="/contracts/new" className="hover:underline hidden xs:inline">{t('nav.create')}</Link>
                <Link href="/dashboard" className="hover:underline">{t('nav.dashboard')}</Link>
                {session?.user?.email ? (
                  <>
                    <Link href="/profile" className="hover:underline">{t('nav.profile')}</Link>
                    <SignOutButton />
                  </>
                ) : (
                  <>
                    <Link href="/signin" className="inline-flex items-center rounded-md border border-foreground/20 px-3 py-1.5 hover:bg-foreground/5">{t('nav.signin')}</Link>
                    <Link href="/signup" className="inline-flex items-center rounded-md bg-foreground px-3 py-1.5 text-background hover:opacity-90">{t('nav.signup')}</Link>
                  </>
                )}
                <span className="mx-0 md:mx-2 text-foreground/30 hidden sm:inline">|</span>
                <LanguageRegionMenu locale={locale} region={region as any} />
              </nav>
            </div>
          </header>

          <main>{children}</main>

          <footer className="mt-16 border-t border-foreground/10">
            {/* Mobile language/region controls */}
            <div className="sm:hidden border-t border-foreground/10">
              <div className="mx-auto max-w-6xl px-4 h-10 flex items-center justify-end gap-3 text-xs">
                <LanguageRegionMenu locale={locale} region={region as any} />
              </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-foreground/70 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <img src="/globe.svg" alt="TrustMeBro" className="h-4 w-4" />
                <span>{t('nav.copyright', { year: new Date().getFullYear() })}</span>
              </div>
              <div className="md:ml-auto flex items-center gap-4">
                <Link href="/security" className="hover:underline">{t('nav.security')}</Link>
                <Link href="/privacy" className="hover:underline">{t('nav.privacy')}</Link>
                <Link href="/status" className="hover:underline">{t('nav.status')}</Link>
                <Link href="/contact" className="hover:underline">{t('nav.contact')}</Link>
              </div>
            </div>
          </footer>
        </I18nProvider>
      </body>
    </html>
  );
}
