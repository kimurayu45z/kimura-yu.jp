import type { APIRoute } from 'astro';
import QRCode from 'qrcode';

import { getLocale } from '@/paraglide/runtime';
import { site } from '@/site';

export const GET: APIRoute = async () => {
	const locale = getLocale();
	const svg: string = await QRCode.toString(`${site.entryUrl}/${locale}`, {
		type: 'svg',
		margin: 1,
		width: 288,
		color: { dark: '#1b292e', light: '#ffffff' },
		errorCorrectionLevel: 'M'
	});
	return new Response(svg, {
		headers: {
			'Cache-Control': 'public, max-age=86400',
			'Content-Type': 'image/svg+xml; charset=utf-8',
			'X-Content-Type-Options': 'nosniff'
		}
	});
};
