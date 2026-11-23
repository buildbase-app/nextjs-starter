import { defineConfig, devices } from '@playwright/test';

// Set to test a server that is already running (a production build in the
// scores workflow, a preview deploy): no dev server is started then.
const externalBaseUrl = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: './e2e',
  // Signed-in tests against a deployed app run with playwright.live.config.ts.
  testIgnore: 'live/**',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: externalBaseUrl ?? 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // A Chrome or Chromium already on the machine (the same variable
        // Lighthouse CI reads), instead of Playwright's own download.
        ...(process.env.CHROME_PATH
          ? { launchOptions: { executablePath: process.env.CHROME_PATH } }
          : {}),
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: externalBaseUrl
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
      },
});
