import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrustMeBro — Secure collaborations for brands & creators",
  description: "Escrow + digital contracts for influencer collaborations (EU & US). Dual deposits, verified deliverables, automatic payouts. GDPR/FTC aware.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 h-14 flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <img src="/globe.svg" alt="TrustMeBro" className="h-5 w-5" />
              <span className="text-sm font-semibold">TrustMeBro</span>
            </Link>
            <nav className="ml-auto flex items-center gap-4 text-sm">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/contracts/new" className="hover:underline">Create contract</Link>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <Link href="/signin" className="inline-flex items-center rounded-md border border-foreground/20 px-3 py-1.5 hover:bg-foreground/5">Sign in</Link>
              <span className="mx-2 text-foreground/30">|</span>
              <Link href="/?lang=en" className="hover:underline">EN</Link>
              <Link href="/?lang=fr" className="hover:underline">FR</Link>
              <span className="mx-2 text-foreground/30">/</span>
              <Link href="/?region=eu" className="hover:underline">EU</Link>
              <Link href="/?region=us" className="hover:underline">US</Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-16 border-t border-foreground/10">
          <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-foreground/70 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <img src="/globe.svg" alt="TrustMeBro" className="h-4 w-4" />
              <span>© {new Date().getFullYear()} TrustMeBro</span>
            </div>
            <div className="md:ml-auto flex items-center gap-4">
              <Link href="/security" className="hover:underline">Security</Link>
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <Link href="/status" className="hover:underline">Status</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
