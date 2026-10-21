import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dev } from 'astro';
import { chromium } from '@playwright/test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'output/pdf/kimura-yu-portfolio-ja.pdf');
const published = resolve(root, 'public/portfolio/kimura-yu-portfolio-ja.pdf');
const temporary = resolve(root, 'tmp/pdfs');
const port = await new Promise((resolvePort, reject) => {
	const server = createServer();
	server.on('error', reject);
	server.listen(0, '127.0.0.1', () => {
		const address = server.address();
		server.close(() => resolvePort(address.port));
	});
});
const origin = `http://127.0.0.1:${port}`;
const server = await dev({ root, server: { host: '127.0.0.1', port }, logLevel: 'silent' });
let browser;
try {
	browser = await chromium.launch();
	const page = await browser.newPage({ locale: 'ja-JP' });
	const response = await page.goto(`${origin}/ja/portfolio/print`, { waitUntil: 'networkidle' });
	if (!response?.ok()) throw new Error('Could not load the portfolio print route.');
	await page.emulateMedia({ media: 'print' });
	await page.evaluate(async () => {
		await document.fonts.ready;
		await Promise.all(
			[...document.images].map(async (image) => {
				if (!image.complete) await image.decode();
				if (!image.naturalWidth)
					throw new Error(`Portfolio image failed: ${image.getAttribute('src')}`);
			})
		);
	});
	const snapshot = await page.evaluate(() => ({
		title: document.title,
		text: document.querySelector('.portfolio-document')?.textContent,
		cases: [...document.querySelectorAll('.case-study')].map((element) => ({
			id: element.id,
			title: element.querySelector('h2')?.textContent,
			sections: [...element.querySelectorAll('h3')].map((heading) => heading.textContent)
		})),
		restrictedLinks: document.querySelectorAll(
			'a[href^="mailto:"], a[href^="tel:"], a[href*="t.me/"], a[href*="instagram.com/"]'
		).length
	}));
	if (snapshot.cases.length !== 3 || snapshot.cases.some((item) => item.sections.length !== 5)) {
		throw new Error('Expected three complete cases with five shared sections each.');
	}
	if (snapshot.restrictedLinks)
		throw new Error('Restricted contacts must not appear in the public PDF.');
	await mkdir(dirname(output), { recursive: true });
	await mkdir(dirname(published), { recursive: true });
	await mkdir(temporary, { recursive: true });
	const pending = resolve(temporary, 'portfolio-pending.pdf');
	await page.pdf({
		path: pending,
		format: 'A4',
		preferCSSPageSize: true,
		printBackground: true,
		displayHeaderFooter: false,
		tagged: true,
		outline: true
	});
	await rename(pending, output);
	await copyFile(output, published);
	await writeFile(
		resolve(temporary, 'portfolio-content.json'),
		`${JSON.stringify(snapshot, null, 2)}\n`
	);
	const sourceHash = createHash('sha256')
		.update(await readFile(resolve(root, 'src/content/portfolio.ts')))
		.digest('hex');
	await writeFile(
		resolve(dirname(published), 'manifest.json'),
		`${JSON.stringify(
			{
				locale: 'ja',
				source: 'src/content/portfolio.ts',
				sourceHash,
				path: '/portfolio/kimura-yu-portfolio-ja.pdf',
				cases: snapshot.cases.map((item) => item.id)
			},
			null,
			2
		)}\n`
	);
	console.log('Generated Japanese portfolio PDF from the shared Web content.');
	console.log(output);
} finally {
	await browser?.close();
	await server.stop();
}
