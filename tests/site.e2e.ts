import { expect, test } from '@playwright/test';

test('redirects the root route using the preferred language', async ({ request }) => {
	const response = await request.get('/', {
		headers: { 'accept-language': 'ja-JP,ja;q=0.9' },
		maxRedirects: 0
	});
	expect(response.status()).toBe(302);
	expect(response.headers().location).toBe('/ja');
});

for (const { locale, htmlLang, heading } of [
	{ locale: 'en', htmlLang: 'en', heading: '木村 優' },
	{ locale: 'ja', htmlLang: 'ja', heading: '木村 優' },
	{ locale: 'zh', htmlLang: 'zh', heading: '木村优' }
]) {
	test(`renders the ${locale} public card with canonical metadata`, async ({ page }) => {
		await page.goto(`/${locale}`);
		await expect(page.locator('html')).toHaveAttribute('lang', htmlLang);
		await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			'href',
			`https://www.kimura-yu.jp/${locale}`
		);
		await expect(page.locator('link[hreflang="zh"]')).toHaveAttribute(
			'href',
			'https://www.kimura-yu.jp/zh'
		);
		const qrImages = page.locator(`img[src="/${locale}/qr.svg"]`);
		await expect(qrImages).toHaveCount(2);
		await expect(qrImages.first()).toBeVisible();
	});
}

test('keeps restricted details out of public HTML, QR, and vCard', async ({ page }) => {
	const response = await page.goto('/en');
	expect(response?.status()).toBe(200);
	const html = await page.content();
	expect(html).not.toContain('private@example.test');
	expect(html).not.toContain('work@example.test');
	expect(html).not.toContain('rising@example.test');
	expect(html).not.toContain('+81 80 0000 0001');
	expect(html).not.toContain('instagram.com/example');
	expect(html).not.toMatch(/[\uFF08\uFF09]/);

	const brandColors = {
		x: '#000000',
		facebook: '#0866FF',
		linkedin: '#0A66C2',
		telegram: '#26A5E4',
		note: '#040000'
	};
	for (const [logo, color] of Object.entries(brandColors)) {
		const asset = await page.request.get(`/assets/logos/${logo}.svg`);
		expect(asset.status()).toBe(200);
		expect(asset.headers()['content-type']).toContain('image/svg+xml');
		expect(await asset.text()).toContain(`fill="${color}"`);
	}
	await expect(page.locator('img[src="/assets/logos/x.svg"]')).toBeVisible();
	await expect(page.locator('img[src="/assets/logos/note.svg"]')).toBeVisible();
	await expect(page.locator('.social-grid .note-social')).toContainText(
		'The Interchain White Hat Hacker'
	);

	const qr = await page.request.get('/en/qr.svg');
	expect(qr.status()).toBe(200);
	const qrText = await qr.text();
	expect(qrText).not.toContain('private@example.test');
	expect(qrText).not.toContain('test-private-passphrase');

	const vcard = await page.request.get('/en/contact.vcf');
	expect(vcard.status()).toBe(200);
	const vcardText = await vcard.text();
	expect(vcardText).not.toContain('EMAIL;');
	expect(vcardText).not.toContain('TEL;');
});

test('protects private HTML and vCard until the access code is verified', async ({ page }) => {
	const initial = await page.goto('/en/private');
	expect(initial?.status()).toBe(200);
	expect(initial?.headers()['cache-control']).toContain('no-store');
	expect(initial?.headers()['x-robots-tag']).toContain('noindex');
	await expect(page.getByRole('heading', { name: 'Private mode' })).toBeVisible();
	await expect(page.getByText('private@example.test')).toHaveCount(0);

	const lockedCard = await page.request.get('/en/private/contact.vcf', { maxRedirects: 0 });
	expect(lockedCard.status()).toBe(303);

	await page.getByLabel('Access code').fill('wrong');
	await page.getByRole('button', { name: 'Open private card' }).click();
	await expect(page.getByRole('alert')).toHaveText('That access code is not correct.');

	await page.getByLabel('Access code').fill('test-private-passphrase-2026');
	await page.getByRole('button', { name: 'Open private card' }).click();
	await expect(page.getByText('private@example.test')).toBeVisible();
	await expect(page.getByText('work@example.test')).toBeVisible();
	await expect(page.getByText('rising@example.test')).toBeVisible();
	await expect(page.getByText('+81 80 0000 0001')).toBeVisible();
	await expect(page.getByText('@example').last()).toBeVisible();

	const sessionCookie = (await page.context().cookies()).find((cookie) =>
		cookie.name.includes('kimura_private')
	);
	expect(sessionCookie).toBeDefined();
	const fullCard = await page.request.get('/en/private/contact.vcf', {
		headers: { cookie: `${sessionCookie?.name}=${sessionCookie?.value}` },
		maxRedirects: 0
	});
	expect(fullCard.status()).toBe(200);
	expect(fullCard.headers()['cache-control']).toContain('no-store');
	const fullCardText = await fullCard.text();
	expect(fullCardText).toContain('EMAIL;TYPE=home:private@example.test');
	expect(fullCardText).toContain('EMAIL;TYPE=work:work@example.test');
	expect(fullCardText).toContain('EMAIL;TYPE=work:rising@example.test');
	expect(fullCardText).toContain('TEL;TYPE=cell;VALUE=uri:tel:+818000000001');

	await page.getByRole('button', { name: 'Sign out' }).click();
	await expect(page.getByRole('heading', { name: 'Private mode' })).toBeVisible();
	await expect(page.getByLabel('Access code')).toBeVisible();
	await expect(page.getByText('private@example.test')).toHaveCount(0);
	expect(
		(await page.context().cookies()).find((cookie) => cookie.name.includes('kimura_private'))
	).toBeUndefined();
});

test('rejects cross-site private-session submissions', async ({ request }) => {
	const response = await request.post('/en/private/session', {
		form: { password: 'test-private-passphrase-2026' },
		headers: { origin: 'https://attacker.example' },
		maxRedirects: 0
	});
	expect(response.status()).toBe(403);
});

test('keeps the card inside a narrow mobile viewport', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/ja');
	expect(await page.content()).not.toMatch(/[\uFF08\uFF09]/);
	const hasHorizontalOverflow = await page.evaluate(
		() => document.documentElement.scrollWidth > window.innerWidth
	);
	expect(hasHorizontalOverflow).toBe(false);
	await expect(page.locator('img[src="/ja/qr.svg"]')).toHaveCount(2);
	await expect(page.locator('img[src="/ja/qr.svg"]').first()).toBeVisible();
	await expect(page.getByText(/登録解除 \(自己都合\)/)).toBeVisible();
	await expect(page.getByText(/試験合格/)).toBeVisible();
	const shareActionHeights = await page
		.locator('.share-actions > [data-slot="button"]')
		.evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().height));
	expect(shareActionHeights).toHaveLength(3);
	expect(new Set(shareActionHeights)).toEqual(new Set([48]));

	const card = page.locator('[data-card-id="cauchye"]');
	expect(
		await page
			.locator('.business-card-face')
			.first()
			.evaluate((element) => {
				return Number.parseFloat(getComputedStyle(element).borderRadius);
			})
	).toBeGreaterThanOrEqual(20);
	await expect(page.locator('.card-edge')).toHaveCount(0);
	expect(await card.evaluate((element) => getComputedStyle(element).transform)).toBe('none');
	const columnHeights = await card.evaluate((element) => {
		const identity = element.querySelector<HTMLElement>('.identity');
		const qr = element.querySelector<HTMLElement>('.qr-wrap');
		return {
			identity: identity?.getBoundingClientRect().height ?? 0,
			qr: qr?.getBoundingClientRect().height ?? 0
		};
	});
	expect(Math.abs(columnHeights.identity - columnHeights.qr)).toBeLessThanOrEqual(1);
	expect(
		await page
			.locator('[data-embla-slide]')
			.first()
			.evaluate((element) => Number.parseFloat(getComputedStyle(element).paddingInlineStart))
	).toBeGreaterThanOrEqual(16);
	await expect(page.locator('#organizations-heading')).toHaveCount(0);
	await expect(card.getByRole('link', { name: 'cauchye.com' })).toHaveAttribute(
		'href',
		'https://cauchye.example'
	);
	const firstSocial = page.locator('.social-grid a').first();
	await firstSocial.hover();
	expect(
		await firstSocial.evaluate((element) => getComputedStyle(element).backgroundColor)
	).not.toBe('rgb(237, 188, 100)');
	await expect(page.getByText('1 / 2')).toBeVisible();
	await page.getByRole('button', { name: '次の名刺' }).click();
	await expect(page.getByText('2 / 2')).toBeVisible();
	await expect(page.locator('[data-card-id="rising-fuku"]')).toBeVisible();
	await expect(
		page.locator('[data-card-id="rising-fuku"]').getByRole('link', {
			name: 'teppan.ownerbook.io'
		})
	).toHaveAttribute('href', 'https://teppan.example');

	await page.getByRole('button', { name: '言語' }).click();
	await expect(page.getByRole('menuitem', { name: '中文' })).toHaveAttribute('href', '/zh');

	const colors = await page.evaluate(() => ({
		primary: getComputedStyle(document.documentElement).getPropertyValue('--primary').trim(),
		accent: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
	}));
	expect(colors).toEqual({ primary: '#6495ed', accent: '#edbc64' });
});
