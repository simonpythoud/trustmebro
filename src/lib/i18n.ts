import en from '@/locales/en.json'
import fr from '@/locales/fr.json'
import es from '@/locales/es.json'
import de from '@/locales/de.json'
import it from '@/locales/it.json'
import cn from '@/locales/cn.json'
import ar from '@/locales/ar.json'
import hi from '@/locales/hi.json'
import bn from '@/locales/bn.json'
import pt from '@/locales/pt.json'
import ru from '@/locales/ru.json'
import ja from '@/locales/ja.json'
import ur from '@/locales/ur.json'
import id from '@/locales/id.json'
import tr from '@/locales/tr.json'
import ko from '@/locales/ko.json'

export const SUPPORTED_LOCALES = ['en', 'fr', 'es', 'de', 'it', 'cn', 'ar', 'hi', 'bn', 'pt', 'ru', 'ja', 'ur', 'id', 'tr', 'ko'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

const DICTS: Record<Locale, Record<string, any>> = {
	en,
	fr,
	es,
	de,
	it,
	cn,
	ar,
	hi,
	bn,
	pt,
	ru,
	ja,
	ur,
	id,
	tr,
	ko,
}

export function normalizeLocale(input: string | undefined | null): Locale {
	const lower = (input ?? '').toLowerCase()
	if (lower.startsWith('en')) return 'en'
	if (lower.startsWith('fr')) return 'fr'
	if (lower.startsWith('es')) return 'es'
	if (lower.startsWith('de')) return 'de'
	if (lower.startsWith('it')) return 'it'
	if (lower.startsWith('zh') || lower.startsWith('cn')) return 'cn'
	if (lower.startsWith('ar')) return 'ar'
	if (lower.startsWith('hi')) return 'hi'
	if (lower.startsWith('bn')) return 'bn'
	if (lower.startsWith('pt')) return 'pt'
	if (lower.startsWith('ru')) return 'ru'
	if (lower.startsWith('ja')) return 'ja'
	if (lower.startsWith('ur')) return 'ur'
	if (lower.startsWith('id') || lower.startsWith('in')) return 'id'
	if (lower.startsWith('tr')) return 'tr'
	if (lower.startsWith('ko')) return 'ko'
	return 'en'
}

function getFromDict(dict: Record<string, any>, key: string): any {
	const parts = key.split('.')
	let cur: any = dict
	for (const p of parts) {
		if (cur && typeof cur === 'object' && p in cur) cur = cur[p]
		else return undefined
	}
	return cur
}

export function getT(locale: Locale) {
	const primary = DICTS[locale] ?? DICTS.en
	return (key: string, vars?: Record<string, string | number>): string => {
		let out = getFromDict(primary, key)
		if (out === undefined) out = getFromDict(DICTS.en, key)
		if (out === undefined) return key
		if (typeof out !== 'string') return String(out)
		if (vars) {
			for (const [k, v] of Object.entries(vars)) {
				out = out.replace(new RegExp(`{${k}}`, 'g'), String(v))
			}
		}
		return out
	}
}

export function getMessages(locale: Locale) {
	return DICTS[locale] ?? DICTS.en
}


