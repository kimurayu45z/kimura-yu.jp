import { defineMiddleware } from 'astro:middleware';

import { localeFromRequest } from '@/lib/locales';
import { paraglideMiddleware } from '@/paraglide/server';

const PRIVATE_PATH = /^\/(?:en|ja|zh)\/private(?:\/|$)/;

function securedResponse(response: Response, isPrivate: boolean): Response {
	const headers: Headers = new Headers(response.headers);
	headers.set('X-Content-Type-Options', 'nosniff');
	headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
	if (isPrivate) {
		headers.set('Cache-Control', 'private, no-store, max-age=0');
		headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
		headers.set('Referrer-Policy', 'same-origin');
		headers.append('Vary', 'Cookie');
	} else {
		headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	}
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}

export const onRequest = defineMiddleware(async (context, next) => {
	const originalPath: string = new URL(context.request.url).pathname;
	if (originalPath === '/' || originalPath === '/private') {
		const locale: string = localeFromRequest(context.request);
		const target: string = originalPath === '/' ? `/${locale}` : `/${locale}/private`;
		return new Response(null, {
			status: 302,
			headers: {
				'Cache-Control': 'private, no-store',
				Location: target,
				Vary: 'Accept-Language'
			}
		});
	}

	const response: Response = await paraglideMiddleware(context.request, ({ request }) =>
		next(request)
	);
	return securedResponse(response, PRIVATE_PATH.test(originalPath));
});
