"use client"
import React, { createContext, useContext, useMemo } from 'react'
import { getT, type Locale } from '@/lib/i18n'

type I18nContextValue = {
  locale: Locale
  t: (key: string, vars?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ locale, children }: { locale: Locale, children: React.ReactNode }) {
  const value = useMemo<I18nContextValue>(() => ({ locale, t: getT(locale) }), [locale])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    // Default to English if not wrapped
    const fallbackLocale: Locale = 'en'
    return { locale: fallbackLocale, t: getT(fallbackLocale) }
  }
  return ctx
}


