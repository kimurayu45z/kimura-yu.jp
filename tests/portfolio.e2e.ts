import { expect, test } from '@playwright/test';

for (const locale of ['ja', 'en', 'zh']) {
	test(`renders ${locale} work in the shared record-panel format without PDF downloads`, async ({
		page
	}) => {
		await page.goto(`/${locale}`);
		const portfolio = page.locator('#portfolio');
		await expect(page.locator('.card-page > section').last()).toHaveAttribute('id', 'portfolio');
		await expect(portfolio).toHaveClass(/record-panel/);
		await expect(portfolio.locator('header .row-icon svg')).toBeVisible();
		await expect(portfolio.locator('article')).toHaveCount(3);
		await expect(
			portfolio.getByRole('link', { name: 'FUKU STEEL PLATE FUND', exact: true })
		).toHaveAttribute('href', 'https://teppan.ownerbook.io');
		await expect(portfolio.getByRole('link', { name: 'D6E', exact: true })).toHaveAttribute(
			'href',
			'https://www.d6e.ai'
		);
		await expect(page.locator('a[download], a[href$=".pdf"]')).toHaveCount(0);
	});
}

test('matches the education and credentials headings on mobile', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/ja#d6e-systems');
	await expect(page.locator('#d6e-systems')).toBeInViewport();
	expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(
		false
	);
	const headings = await page.locator('.record-panel > header').evaluateAll((elements) =>
		elements.map((element) => {
			const heading = element.querySelector('h2');
			const icon = element.querySelector('.row-icon');
			return {
				padding: getComputedStyle(element).padding,
				fontSize: heading && getComputedStyle(heading).fontSize,
				iconWidth: icon?.getBoundingClientRect().width,
				iconHeight: icon?.getBoundingClientRect().height
			};
		})
	);
	expect(headings).toHaveLength(3);
	expect(headings[2]).toEqual(headings[0]);
	expect(headings[2]).toEqual(headings[1]);
});

test('prints the current profile without navigation or actions', async ({ page }) => {
	await page.goto('/ja');
	await page.getByRole('button', { name: '次の名刺' }).click();
	await expect(page.locator('[data-card-id="rising-fuku"]')).toBeInViewport();
	await page.emulateMedia({ media: 'print' });
	await expect(page.locator('header[data-screen-only]')).toBeHidden();
	await expect(page.locator('.share-actions')).toBeHidden();
	await expect(page.locator('.carousel-controls')).toBeHidden();
	await expect(page.locator('[data-card-id="rising-fuku"]')).toBeVisible();
	await expect(page.locator('[data-card-id="cauchye"]')).toBeHidden();
	await expect(page.locator('#education')).toBeVisible();
	await expect(page.locator('#credentials')).toBeVisible();
	await expect(page.locator('#portfolio')).toBeVisible();
});

test('redirects the former dedicated page and no longer serves generated PDF files', async ({
	request
}) => {
	const response = await request.get('/ja/portfolio', { maxRedirects: 0 });
	expect(response.status()).toBe(308);
	expect(response.headers().location).toBe('/ja#portfolio');
	const pdf = await request.get('/portfolio/kimura-yu-portfolio-ja.pdf');
	expect(pdf.status()).toBe(404);
	const print = await request.get('/ja/portfolio/print');
	expect(print.status()).toBe(404);
});
