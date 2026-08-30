import type { APIRoute } from 'astro';

import { PRIVATE_SESSION_COOKIE, verifyPrivateSession } from '@/lib/server/auth';
import { privateAuthConfiguration, privateContacts, publicContacts } from '@/lib/server/contacts';
import { createVCard } from '@/lib/vcard';
import { getLocale } from '@/paraglide/runtime';

export const GET: APIRoute = ({ cookies }) => {
	const locale = getLocale();
	const auth = privateAuthConfiguration();
	const token: string | undefined = cookies.get(PRIVATE_SESSION_COOKIE)?.value;
	if (!auth.sessionSecret || !verifyPrivateSession(token, auth.sessionSecret)) {
		return new Response(null, {
			status: 303,
			headers: { Location: `/${locale}/private?error=expired` }
		});
	}

	return new Response(createVCard(locale, publicContacts(), privateContacts()), {
		headers: {
			'Cache-Control': 'private, no-store, max-age=0',
			'Content-Disposition': 'attachment; filename="yu-kimura-private.vcf"',
			'Content-Type': 'text/vcard; charset=utf-8',
			'X-Robots-Tag': 'noindex, nofollow, noarchive'
		}
	});
};
