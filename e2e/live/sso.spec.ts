import { expect, test } from '@playwright/test';

/**
 * Enterprise single sign-on, end to end, as a real employee would: the
 * hosted login page's Single sign-on, their work email, the company's Okta,
 * and back into the app. Checks they joined the workspace their enterprise
 * is bound to and that the Enterprise page shows the company with single
 * sign-on on.
 *
 * Needs a test user in the identity provider (BUILDBASE_E2E_SSO_EMAIL and
 * BUILDBASE_E2E_SSO_PASSWORD) whose email domain is a verified domain of an
 * active enterprise. Their identity provider's policy must accept a password
 * alone. Skipped when they are not set.
 */
const email = process.env.BUILDBASE_E2E_SSO_EMAIL;
const password = process.env.BUILDBASE_E2E_SSO_PASSWORD;

test.skip(!email || !password, 'SSO test user not configured');

test('a company employee signs in through their identity provider', async ({
  page,
}) => {
  test.setTimeout(150_000);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto('/en');
  await page
    .getByRole('button', { name: /reject all/i })
    .click({ timeout: 8_000 })
    .catch(() => {});
  await page
    .getByRole('button', { name: /^sign in$/i })
    .first()
    .click();

  // The hosted BuildBase login page.
  await page.getByText('Single sign-on', { exact: true }).click();
  await page.getByLabel(/work email/i).fill(email!);
  await page.getByRole('button', { name: /continue with sso/i }).click();

  // The company's identity provider (Okta's sign-in widget).
  await page.waitForURL(/okta\.com/, { timeout: 30_000 });
  const identifier = page.locator(
    'input[name="identifier"], input[name="username"]'
  );
  if (
    await identifier
      .first()
      .isVisible({ timeout: 10_000 })
      .catch(() => false)
  ) {
    await identifier.first().fill(email!);
    await page
      .locator('input[type="submit"], button[type="submit"]')
      .first()
      .click();
  }
  await page.locator('input[type="password"]').first().fill(password!);
  await page
    .locator('input[type="submit"], button[type="submit"]')
    .first()
    .click();

  // Back on the hosted page, BuildBase may offer to trust the device and to
  // add a passkey: both optional, so skip them until the app is reached.
  const appOrigin = new URL(test.info().project.use.baseURL!).origin;
  for (let i = 0; i < 12 && new URL(page.url()).origin !== appOrigin; i++) {
    await page.waitForTimeout(2_500);
    if (/\/auth\/(trust-device|passkey-enroll)/.test(page.url())) {
      await page
        .getByRole('button', { name: /^(not now|skip|maybe later)$/i })
        .or(page.getByText(/^(not now|skip for now|maybe later)$/i))
        .first()
        .click();
    }
  }
  await page.waitForURL((u) => u.origin === appOrigin, { timeout: 30_000 });

  // Signed in: the app restores a session.
  const session = (await (
    await page.request.get('/api/auth/session')
  ).json()) as {
    sessionId: string | null;
  };
  expect(session.sessionId).toBeTruthy();

  // The enterprise screen shows the company with single sign-on on.
  await page.goto('/en/dashboard/enterprise');
  await expect(page.getByText(/single sign-on is on/i).first()).toBeVisible({
    timeout: 20_000,
  });

  expect(errors, errors.join('\n')).toEqual([]);
});
