import { expect, test } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

for (const locale of ['ja', 'en', 'zh']) {
	test(`keeps ${locale} work at the bottom of the profile with shared PDF summaries`, async ({
		page
	}) => {
		await page.goto(`/${locale}`);
		const portfolio = page.locator('#portfolio');
		await expect(page.locator('.card-page > section').last()).toHaveAttribute('id', 'portfolio');
		await expect(portfolio.locator('article')).toHaveCount(3);
		const summaries = await portfolio.locator('.project-copy p').allTextContents();
		await expect(portfolio.getByRole('link', { name: 'FUKU', exact: true })).toHaveAttribute(
			'href',
			'https://teppan.ownerbook.io'
		);
		await expect(portfolio.getByRole('link', { name: 'D6E', exact: true })).toHaveAttribute(
			'href',
			'https://www.d6e.ai'
		);
		await expect(portfolio.locator('a[href*="/portfolio#"]')).toHaveCount(0);
		await page.goto(`/${locale}/portfolio/print`);
		expect(await page.locator('.case-summary').allTextContents()).toEqual(summaries);
		await expect(page.locator('article.case-study h3')).toHaveCount(15);
		await expect(
			page.locator('button, [data-slot="button"], body > header, body > footer')
		).toHaveCount(0);
		expect(await page.content()).not.toMatch(
			/private@example\.test|work@example\.test|rising@example\.test|test-private-passphrase|[\uFF08\uFF09]/
		);
		await expect(page.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0);
	});
}

test('keeps inline case links inside a narrow viewport', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/ja#d6e-systems');
	await expect(page.locator('#d6e-systems')).toBeInViewport();
	expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(
		false
	);
	await page.getByRole('button', { name: '言語', exact: true }).click();
	await expect(page.getByRole('menuitem', { name: 'English' })).toHaveAttribute('href', '/en');
});

test('redirects the old dedicated page to the profile section', async ({ request }) => {
	const response = await request.get('/ja/portfolio', { maxRedirects: 0 });
	expect(response.status()).toBe(308);
	expect(response.headers().location).toBe('/ja#portfolio');
});

test('serves a generated PDF whose manifest matches the shared content', async ({ request }) => {
	const manifest = await request.get('/portfolio/manifest.json');
	expect(manifest.ok()).toBe(true);
	const data = await manifest.json();
	const sourceHash = createHash('sha256')
		.update(await readFile('src/content/portfolio.ts'))
		.digest('hex');
	expect(data.sourceHash).toBe(sourceHash);
	const pdf = await request.get(data.path);
	expect(pdf.status()).toBe(200);
	expect(pdf.headers()['content-type']).toContain('application/pdf');
	expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
});
