import { expect, test } from '@playwright/test';

/**
 * Every dashboard page, signed in, on the deployed app: it loads, shows its
 * heading and no error screen, and throws nothing in the browser. Pages whose
 * console setup is missing still pass: the SDK shows its empty and "not set
 * up" states, which is what they should do.
 */
const PAGES = [
  '/dashboard',
  '/dashboard/tour',
  '/dashboard/inbox',
  '/dashboard/documents',
  '/dashboard/profile',
  '/dashboard/credits',
  '/dashboard/usage',
  '/dashboard/affiliates',
  '/dashboard/shop',
  '/dashboard/orders',
  '/dashboard/bookings',
  '/dashboard/cart',
  '/dashboard/permissions',
  '/dashboard/events',
  '/dashboard/notifications',
];

test('the session cookie restores a session', async ({ page }) => {
  const res = await page.request.get('/api/auth/session');
  expect(res.ok()).toBe(true);
  const { sessionId } = (await res.json()) as { sessionId: string | null };
  expect(sessionId).toBeTruthy();
});

for (const path of PAGES) {
  test(`${path} renders signed in`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));

    const res = await page.goto(`/en${path}`);
    expect(res?.status() ?? 0).toBeLessThan(400);

    const heading = page.locator('main h1, h1').first();
    await expect(heading).toBeVisible({ timeout: 20_000 });
    await expect(heading).not.toHaveText(
      /something went wrong|an error has occurred|page not found/i
    );
    // Signed in: the app offers no sign-in.
    await expect(page.getByRole('button', { name: /^sign in$/i })).toHaveCount(
      0
    );

    expect(errors, errors.join('\n')).toEqual([]);
  });
}

test('?settings=<section> opens that section of the SDK settings dialog', async ({
  page,
}) => {
  await page.goto('/en/dashboard?settings=users');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible({ timeout: 20_000 });
  await expect(dialog.getByText(/members/i).first()).toBeVisible();
  // The parameter is dropped so a reload does not open it again.
  await expect(page).not.toHaveURL(/settings=/);
});
