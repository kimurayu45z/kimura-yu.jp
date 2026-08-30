import type { PrivateContacts, PublicContacts } from '@/lib/server/contacts';
import type { Locale } from '@/paraglide/runtime';
import { site } from '@/site';

function escapeValue(value: string): string {
	return value
		.replace(/\\/g, '\\\\')
		.replace(/\r?\n/g, '\\n')
		.replace(/,/g, '\\,')
		.replace(/;/g, '\\;');
}

function localeName(locale: Locale): string {
	if (locale === 'ja') return '木村 優';
	if (locale === 'zh') return '木村优';
	return 'KIMURA Yu';
}

function telephone(value: string): string {
	return value.replace(/[^+\d]/g, '');
}

export function createVCard(
	locale: Locale,
	publicData: PublicContacts,
	privateData?: PrivateContacts
): string {
	const lines: string[] = [
		'BEGIN:VCARD',
		'VERSION:4.0',
		`FN:${escapeValue(localeName(locale))}`,
		'N:Kimura;Yu;;;',
		`BDAY:${site.birthDate}`,
		'ORG:CAUCHYE ASIA PTE. LTD.'
	];

	if (publicData.cauchyeUrl) lines.push(`URL;TYPE=work:${publicData.cauchyeUrl}`);
	if (publicData.teppanUrl) lines.push(`URL;TYPE=work:${publicData.teppanUrl}`);
	for (const entry of publicData.socials) {
		lines.push(`X-SOCIALPROFILE;TYPE=${entry.label.toLowerCase()}:${entry.href}`);
	}

	if (privateData?.personalEmail) {
		lines.push(`EMAIL;TYPE=home:${escapeValue(privateData.personalEmail)}`);
	}
	if (privateData?.cauchyeEmail) {
		lines.push(`EMAIL;TYPE=work:${escapeValue(privateData.cauchyeEmail)}`);
	}
	if (privateData?.risingSunEmail) {
		lines.push(`EMAIL;TYPE=work:${escapeValue(privateData.risingSunEmail)}`);
	}
	if (privateData?.phoneJapan) {
		lines.push(`TEL;TYPE=cell;VALUE=uri:tel:${telephone(privateData.phoneJapan)}`);
	}
	if (privateData?.phoneSingapore) {
		lines.push(`TEL;TYPE=cell;VALUE=uri:tel:${telephone(privateData.phoneSingapore)}`);
	}
	if (privateData?.instagram) {
		lines.push(`X-SOCIALPROFILE;TYPE=instagram:${privateData.instagram.href}`);
	}
	if (privateData?.telegram) {
		lines.push(`X-SOCIALPROFILE;TYPE=telegram:${privateData.telegram.href}`);
	}

	lines.push(`SOURCE:${site.entryUrl}/${locale}`, 'END:VCARD');
	return `${lines.join('\r\n')}\r\n`;
}
