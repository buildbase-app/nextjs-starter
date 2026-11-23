import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/**
 * Automated WCAG 2.2 AA checks (axe-core) on every public page, in both
 * themes and at a phone width. Lighthouse runs a subset of these rules on
 * one viewport; this runs all of them, so a contrast failure that only
 * shows in dark mode or a control that only exists on mobile is caught too.
 *
 * axe finds roughly half of real accessibility problems. Keyboard order,
 * focus after a dialog closes and screen-reader wording still need a person.
 */
const PAGES = [
  '/',
  '/pricing',
  '/blog',
  // A post: code blocks, heading anchors and links in running text.
  '/blog/going-global-with-i18n',
  '/changelog',
  '/help',
  '/waitlist',
  // A shared tour snapshot (some tasks filled in).
  '/tour/progress?d=27Zt27YBAAAAAAAAAAAAAA',
];

/**
 * Violations inside @buildbase/sdk components, each with the SDK issue that
 * fixes it. Only the named rule on the named page is skipped; delete the
 * entry when an SDK release carries the fix.
 */
const KNOWN_SDK_ISSUES: Record<string, { rules: string[]; issue: string }> = {
  '/waitlist': {
    // BetaForm's privacy and terms links are colour-only.
    rules: ['link-in-text-block'],
    issue: 'https://github.com/saas-os/sdk/issues/391',
  },
};
const THEMES = ['light', 'dark'] as const;

for (const path of PAGES) {
  for (const theme of THEMES) {
    test(`${path} has no WCAG 2.2 AA violations (${theme})`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      await page.addInitScript((t) => {
        try {
          localStorage.setItem('theme', t);
        } catch {
          // Storage can be blocked; the colour scheme still applies.
        }
      }, theme);
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      const known = KNOWN_SDK_ISSUES[path]?.rules ?? [];
      const summary = results.violations
        .filter((v) => !known.includes(v.id))
        .map(
          (v) =>
            `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes
              .slice(0, 3)
              .map((n) => n.target.join(' '))
              .join('\n  ')}`
        );
      expect(summary, summary.join('\n')).toEqual([]);
    });
  }
}

test('home page fits a 360px phone without sideways scroll', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('/');
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
