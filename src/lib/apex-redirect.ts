const WWW_ORIGIN = 'https://www.kimura-yu.jp';

export function redirectApexRequest(request: Request): Response {
	const sourceUrl: URL = new URL(request.url);
	const targetUrl: URL = new URL(`${sourceUrl.pathname}${sourceUrl.search}`, WWW_ORIGIN);
	return Response.redirect(targetUrl.toString(), 308);
}
