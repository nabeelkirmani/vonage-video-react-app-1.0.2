import { expect } from '@playwright/test';
import { test, baseURL } from '../fixtures/testWithLogging';

test('home page loads and has expected title', async ({ page }) => {
  // Change this URL to where your frontend is running
  await page.goto(baseURL);

  // This checks that the title includes "Vonage" or "Onasi" or any expected text
  await expect(page).toHaveTitle(/vonage|onasi/i);

  // Optional: Check for some visible element, like a logo or button
  await expect(page.locator('text=Join Session')).toBeVisible();
});
