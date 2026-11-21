import { defineConfig, devices } from '@playwright/test';
import { SIGNED_IN_STATE } from './e2e/live/state';

/**
 * Signed-in end-to-end tests against a deployed app (the demo by default).
 * Runs in CI after each deploy (.github/workflows/e2e-signed-in.yml), or
 * locally: BUILDBASE_E2E_API_TOKEN=... npm run test:e2e:live
 */
export default defineConfig({
  testDir: './e2e/live',
  timeout: 60_000,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  forbidOnly: !!process.env.CI,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report-live' }],
  ],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'https://demo.buildbase.app',
    trace: 'off',
    screenshot: 'only-on-failure',
    video: 'on',
  },
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    {
      name: 'signed-in',
      dependencies: ['setup'],
      testMatch: /\.spec\.ts$/,
      use: { ...devices['Desktop Chrome'], storageState: SIGNED_IN_STATE },
    },
  ],
});
