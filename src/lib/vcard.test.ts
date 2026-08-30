import { describe, expect, it } from 'vitest';

import type { PrivateContacts, PublicContacts } from './server/contacts';
import { createVCard } from './vcard';

const publicData: PublicContacts = {
	cauchyeUrl: 'https://business.example',
	teppanUrl: undefined,
	socials: [{ label: 'X', value: '@example', href: 'https://x.com/example' }]
};

const privateData: PrivateContacts = {
	personalEmail: 'private@example.com',
	cauchyeEmail: 'work@example.com',
	risingSunEmail: 'rising@example.com',
	phoneJapan: '+81 80 0000 0000',
	phoneSingapore: undefined,
	telegram: { label: 'Telegram', value: '@example', href: 'https://t.me/example' },
	instagram: { label: 'Instagram', value: '@example', href: 'https://instagram.com/example' }
};

describe('vCard generation', () => {
	it('keeps private coordinates out of the public card', () => {
		const result = createVCard('en', publicData);
		expect(result).not.toContain('EMAIL;');
		expect(result).not.toContain('private@example.com');
		expect(result).not.toContain('TEL;');
		expect(result).not.toContain('t.me/example');
		expect(result).toContain('SOURCE:https://kimura-yu.jp/en');
		expect(result.endsWith('\r\n')).toBe(true);
	});

	it('includes restricted coordinates only when explicitly supplied', () => {
		const result = createVCard('ja', publicData, privateData);
		expect(result).toContain('FN:木村 優');
		expect(result).toContain('EMAIL;TYPE=home:private@example.com');
		expect(result).toContain('EMAIL;TYPE=work:work@example.com');
		expect(result).toContain('EMAIL;TYPE=work:rising@example.com');
		expect(result).toContain('TEL;TYPE=cell;VALUE=uri:tel:+818000000000');
		expect(result).toContain('X-SOCIALPROFILE;TYPE=instagram:https://instagram.com/example');
		expect(result).toContain('X-SOCIALPROFILE;TYPE=telegram:https://t.me/example');
	});
});
