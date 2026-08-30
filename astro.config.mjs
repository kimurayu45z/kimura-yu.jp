import cloudflare from '@astrojs/cloudflare';
import svelte from '@astrojs/svelte';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://www.kimura-yu.jp',
	output: 'server',
	session: false,
	integrations: [svelte()],
	adapter: cloudflare({
		imageService: 'compile',
		configPath: './wrangler.astro.jsonc'
	}),
	vite: {
		plugins: [
			tailwindcss(),
			paraglideVitePlugin({
				project: './project.inlang',
				outdir: './src/paraglide',
				emitTsDeclarations: true,
				strategy: ['url', 'preferredLanguage', 'baseLocale'],
				urlPatterns: [
					{
						pattern: ':protocol://:domain(.*)::port?/:path(.*)?',
						localized: [
							['en', ':protocol://:domain(.*)::port?/en/:path(.*)?'],
							['ja', ':protocol://:domain(.*)::port?/ja/:path(.*)?'],
							['zh', ':protocol://:domain(.*)::port?/zh/:path(.*)?']
						]
					}
				]
			})
		]
	}
});
