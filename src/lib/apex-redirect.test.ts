import { describe, expect, it } from 'vitest';

import { redirectApexRequest } from './apex-redirect';

describe('apex redirect Worker', () => {
	it('permanently redirects to www while preserving the path and query', () => {
		const response: Response = redirectApexRequest(
			new Request('https://kimura-yu.jp/ja/private?source=qr')
		);

		expect(response.status).toBe(308);
		expect(response.headers.get('location')).toBe('https://www.kimura-yu.jp/ja/private?source=qr');
	});
});
