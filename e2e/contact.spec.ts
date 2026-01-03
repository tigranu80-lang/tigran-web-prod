import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to contact section
    await page.evaluate(() => {
      const contactSection = document.querySelector('[id*="contact"]') ||
                           document.querySelector('form');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    // Wait a bit for scroll and form to be visible
    await page.waitForTimeout(1000);
  });

  test('should display contact form', async ({ page }) => {
    const form = page.locator('form').first();
    await expect(form).toBeVisible({ timeout: 10000 });
  });

  test('should have required form fields', async ({ page }) => {
    // Check for name input
    const nameInput = page.locator('input[name="name"], input[type="text"]').first();
    await expect(nameInput).toBeVisible({ timeout: 10000 });

    // Check for email input
    const emailInput = page.locator('input[name="email"], input[type="email"]').first();
    await expect(emailInput).toBeVisible({ timeout: 10000 });

    // Check for message textarea
    const messageInput = page.locator('textarea[name="message"], textarea').first();
    await expect(messageInput).toBeVisible({ timeout: 10000 });
  });

  test('should show validation on empty submit', async ({ page }) => {
    const form = page.locator('form').first();
    await form.waitFor({ state: 'visible', timeout: 10000 });

    // Find and click submit button
    const submitButton = page.locator('button[type="submit"]').first();
    await expect(submitButton).toBeVisible();

    await submitButton.click();

    // Browser should show HTML5 validation or form should prevent submission
    // Check that we didn't navigate away (thank you page)
    await expect(page).not.toHaveURL('/thank-you');
  });
});
