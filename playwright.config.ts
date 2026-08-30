import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	testMatch: '**/*.e2e.ts',
	use: { baseURL: 'http://127.0.0.1:4173' },
	webServer: {
		command: 'pnpm exec wrangler dev --ip 127.0.0.1 --port 4173 --env-file tests/fixtures/test.env',
		url: 'http://127.0.0.1:4173/en',
		reuseExistingServer: !process.env.CI
	}
});
