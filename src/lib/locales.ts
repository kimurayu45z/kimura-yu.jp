import type { Locale } from '@/paraglide/runtime';

export const localeMetadata = {
	en: { label: 'English', htmlLang: 'en', ogLocale: 'en_US' },
	ja: { label: '日本語', htmlLang: 'ja', ogLocale: 'ja_JP' },
	zh: { label: '中文', htmlLang: 'zh', ogLocale: 'zh' }
} as const satisfies Record<Locale, { label: string; htmlLang: string; ogLocale: string }>;

export const supportedLocales: readonly Locale[] = ['en', 'ja', 'zh'];

export function isLocale(value: string): value is Locale {
	return supportedLocales.includes(value as Locale);
}

export function localeFromRequest(request: Request): Locale {
	const languages = request.headers.get('accept-language')?.toLowerCase() ?? '';
	if (languages.includes('ja')) return 'ja';
	if (languages.includes('zh')) return 'zh';
	return 'en';
}

export function localizedPath(locale: Locale, path = ''): string {
	return `/${locale}${path}`;
}
