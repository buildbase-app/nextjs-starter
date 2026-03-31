import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should load and display heading', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/My App/);
  });

  test('should have sign in button', async ({ page }) => {
    await page.goto('/');
    const signInButton = page.getByRole('button', { name: /sign in/i });
    await expect(signInButton).toBeVisible();
  });

  test('should have theme toggle', async ({ page }) => {
    await page.goto('/');
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    await expect(themeToggle).toBeVisible();
  });
});
