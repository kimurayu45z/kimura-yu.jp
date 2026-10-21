import { expect, test } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

for (const locale of ['ja', 'en', 'zh']) {
	test(`keeps ${locale} portfolio text consistent between Web and print`, async ({ page }) => {
		await page.goto(`/${locale}/portfolio`);
		await expect(page.locator('article.case-study')).toHaveCount(3);
		await expect(page.locator('article.case-study h3')).toHaveCount(15);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			'href',
			`https://www.kimura-yu.jp/${locale}/portfolio`
		);
		const webText = await page.locator('.portfolio-document').textContent();
		for (const project of ['fuku-steel-plate-fund', 'd6e-systems', 'crypto-asset-rescue']) {
			await expect(page.locator(`a[href="#${project}"]`)).toHaveCount(1);
		}
		await page.goto(`/${locale}/portfolio/print`);
		expect(await page.locator('.portfolio-document').textContent()).toBe(webText);
		await expect(
			page.locator('button, [data-slot="button"], body > header, body > footer')
		).toHaveCount(0);
		expect(await page.content()).not.toMatch(
			/private@example\.test|work@example\.test|rising@example\.test|test-private-passphrase|[\uFF08\uFF09]/
		);
		await expect(page.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0);
	});
}

test('links the profile to cases and keeps the portfolio route when switching languages', async ({
	page
}) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/ja');
	await page.getByRole('link', { name: '実績を見る', exact: true }).click();
	await expect(page).toHaveURL(/\/ja\/portfolio$/);
	expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(
		false
	);
	await page.getByRole('button', { name: '言語', exact: true }).click();
	await expect(page.getByRole('menuitem', { name: 'English' })).toHaveAttribute(
		'href',
		'/en/portfolio'
	);
	await page.getByRole('menuitem', { name: 'English' }).click();
	await expect(page).toHaveURL(/\/en\/portfolio$/);
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
