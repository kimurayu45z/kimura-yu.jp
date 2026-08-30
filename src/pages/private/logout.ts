import type { APIRoute } from 'astro';

import { PRIVATE_SESSION_COOKIE } from '@/lib/server/auth';
import { getLocale } from '@/paraglide/runtime';

export const POST: APIRoute = ({ cookies, redirect }) => {
	const locale = getLocale();
	cookies.set(PRIVATE_SESSION_COOKIE, '', {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		expires: new Date(0),
		maxAge: 0
	});
	return redirect(`/${locale}/private`, 303);
};
