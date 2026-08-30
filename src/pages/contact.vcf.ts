import type { APIRoute } from 'astro';

import { publicContacts } from '@/lib/server/contacts';
import { createVCard } from '@/lib/vcard';
import { getLocale } from '@/paraglide/runtime';

export const GET: APIRoute = () => {
	const locale = getLocale();
	return new Response(createVCard(locale, publicContacts()), {
		headers: {
			'Cache-Control': 'public, max-age=300',
			'Content-Disposition': 'attachment; filename="yu-kimura.vcf"',
			'Content-Type': 'text/vcard; charset=utf-8'
		}
	});
};
