import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for DOM to be ready (networkidle hangs due to analytics)
    await page.waitForLoadState('domcontentloaded');
  });

  test('should load home page successfully', async ({ page }) => {
    // Wait for the page to load
    await expect(page).toHaveTitle(/AutoMate/);
  });

  test('should display header navigation', async ({ page }) => {
    // Check if header exists
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    // Hero section should be visible - wait explicitly for React to render
    const main = page.locator('main#main-content');
    await expect(main).toBeVisible({ timeout: 15000 });
  });

  test('should have working footer', async ({ page }) => {
    const footer = page.locator('footer');
    // Use Playwright's built-in scroll method instead of raw JS
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
  });

  test('should navigate to blueprints page', async ({ page }) => {
    // Find and click blueprints link if it exists
    const blueprintsLink = page.locator('a[href="/blueprints"]').first();

    if (await blueprintsLink.isVisible()) {
      await blueprintsLink.click();
      await expect(page).toHaveURL('/blueprints');
    }
  });
});
