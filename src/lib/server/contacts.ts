import { env } from 'cloudflare:workers';

export interface ContactLink {
	label: string;
	value: string;
	href: string;
}

export interface PublicContacts {
	cauchyeUrl: string | undefined;
	teppanUrl: string | undefined;
	socials: ContactLink[];
}

export interface PrivateContacts {
	personalEmail: string | undefined;
	cauchyeEmail: string | undefined;
	risingSunEmail: string | undefined;
	phoneJapan: string | undefined;
	phoneSingapore: string | undefined;
	instagram: ContactLink | undefined;
}

function optionalValue(value: string | undefined): string | undefined {
	const trimmed: string = value?.trim() ?? '';
	return trimmed.length > 0 ? trimmed : undefined;
}

function social(label: string, value: string | undefined): ContactLink | undefined {
	const href: string | undefined = optionalValue(value);
	if (!href) return undefined;
	const handle: string = href.split('/').filter(Boolean).at(-1) ?? href;
	return { label, value: `@${handle.replace(/^@/, '')}`, href };
}

export function publicContacts(): PublicContacts {
	const socials: Array<ContactLink | undefined> = [
		social('X', env.SOCIAL_X_URL),
		social('Facebook', env.SOCIAL_FACEBOOK_URL),
		social('LinkedIn', env.SOCIAL_LINKEDIN_URL),
		social('Telegram', env.SOCIAL_TELEGRAM_URL)
	];

	return {
		cauchyeUrl: optionalValue(env.CAUCHYE_URL),
		teppanUrl: optionalValue(env.TEPPAN_URL),
		socials: socials.filter((entry): entry is ContactLink => entry !== undefined)
	};
}

export function privateContacts(): PrivateContacts {
	return {
		personalEmail: optionalValue(env.PERSONAL_EMAIL),
		cauchyeEmail: optionalValue(env.CAUCHYE_EMAIL),
		risingSunEmail: optionalValue(env.RISING_SUN_EMAIL),
		phoneJapan: optionalValue(env.PHONE_JP),
		phoneSingapore: optionalValue(env.PHONE_SG),
		instagram: social('Instagram', env.SOCIAL_INSTAGRAM_URL)
	};
}

export function privateAuthConfiguration(): {
	password: string | undefined;
	sessionSecret: string | undefined;
} {
	return {
		password: optionalValue(env.PRIVATE_ACCESS_PASSWORD),
		sessionSecret: optionalValue(env.PRIVATE_SESSION_SECRET)
	};
}
