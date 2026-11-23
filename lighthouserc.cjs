/**
 * Lighthouse CI: scores the public pages of a production build.
 *
 *   npm run build && npm run score         (mobile, the stricter profile)
 *   npm run score:desktop
 *
 * Accessibility, best practices and SEO must score 100 and CLS stay under
 * 0.1: a page that drops below fails. Performance targets 95 on mobile and
 * 98 on desktop (100 would fail at random: a shared runner moves it a few
 * points between runs), but is a warning for now: @buildbase/sdk/react
 * evaluates ~1.7 MB on every page, which holds mobile at 84-88 whatever this
 * app does (https://github.com/saas-os/sdk/issues/390). Make it 'error'
 * when a release fixes that. Reports land in `.lighthouseci/` (git-ignored)
 * and are never uploaded anywhere.
 *
 * Chrome: set CHROME_PATH to a Chromium binary when there is no system
 * Chrome (Playwright's works: `npx playwright install chromium`).
 */
const desktop =
  process.env.LHCI_PRESET === 'desktop' ||
  process.argv.some((arg) => arg.includes('preset=desktop'));

const PAGES = ['/', '/pricing', '/blog', '/changelog', '/help'];
const base = process.env.LHCI_BASE_URL ?? 'http://localhost:3000';

module.exports = {
  ci: {
    collect: {
      url: PAGES.map((path) => `${base}${path}`),
      startServerCommand: process.env.LHCI_BASE_URL
        ? undefined
        : 'npm run start',
      startServerReadyPattern: 'Ready in',
      startServerReadyTimeout: 120000,
      numberOfRuns: 3,
      settings: {
        ...(desktop ? { preset: 'desktop' } : {}),
        chromeFlags: '--headless=new --no-sandbox',
        // The cookie banner is part of the page a first visit sees, so it
        // stays in: a score earned without it would flatter the site.
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: desktop ? 0.98 : 0.95 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }],
        // On short pages the SDK's client-only cookie banner is the largest
        // paint (sdk#390), so LCP warns too until then.
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 200 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};
