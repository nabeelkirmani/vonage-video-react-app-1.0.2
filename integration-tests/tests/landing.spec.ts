import { expect } from '@playwright/test';
import { test, baseURL } from '../fixtures/testWithLogging';

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});

test('should navigate to waiting room then publish in room via Enter room name textbox', async ({
  page,
}) => {
  await expect(page.locator('button:text("Join")')).toBeDisabled();

  await page.getByPlaceholder('Enter room name').fill('some-room');
  await expect(page.locator('button:text("Join")')).toBeEnabled();

  await page.locator('button:text("Join")').click();

  await page.waitForURL(`${baseURL}waiting-room/some-room`);

  await page.waitForSelector('.video__element', { state: 'visible' });

  await page.getByPlaceholder('Enter your name').fill('some-user');
  await expect(page.getByRole('button', { name: 'Join' })).toBeEnabled();
  await page.getByRole('button', { name: 'Join' }).click();

  await page.waitForURL(`${baseURL}room/some-room`);

  await page.waitForSelector('.publisher', { state: 'visible' });
});

test('should navigate to waiting room then publish in room via Create room button', async ({
  page,
}) => {
  await page.getByRole('button', { name: 'Create room' }).click();

  await page.waitForURL(`${baseURL}waiting-room/**`);

  await page.waitForSelector('.video__element', { state: 'visible' });

  await expect(page.getByRole('button', { name: 'Join' })).toBeDisabled();

  await page.getByPlaceholder('Enter your name').fill('some-user');
  await expect(page.getByRole('button', { name: 'Join' })).toBeEnabled();
  await page.getByRole('button', { name: 'Join' }).click();

  await page.waitForURL(`${baseURL}room/**`);

  await page.waitForSelector('.publisher', { state: 'visible' });
});

test('GitHub Logo Redirect to Vera GitHub URL in New Tab', async ({ page, context }) => {
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('button', { name: 'Visit our GitHub Repo' }).click(), // Opens a new tab
  ]);
  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL('https://github.com/Vonage/vonage-video-react-app/');
});

test('User should be able to navigate to the next page using enter key', async ({ page }) => {
  await page.getByPlaceholder('Enter room name').fill('some-room');

  await page.keyboard.press('Enter');

  await page.waitForURL(`${baseURL}waiting-room/some-room`);

  // This is needed for the DeviceAccessAlert to hide
  await page.waitForSelector('[role="dialog"]', { state: 'hidden' });

  await page.getByPlaceholder('Enter your name').fill('some-user');
  await expect(page.getByRole('button', { name: 'Join' })).toBeEnabled();

  await page.keyboard.press('Enter');

  await page.waitForURL(`${baseURL}room/some-room`);

  await page.waitForSelector('.publisher', { state: 'visible' });
});
