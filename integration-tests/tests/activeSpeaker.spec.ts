import { expect } from '@playwright/test';
import * as crypto from 'crypto';
import { test, baseURL } from '../fixtures/testWithLogging';

test.describe('active speaker', () => {
  test.skip(({ browserName, isMobile }) => browserName !== 'chromium' || isMobile);

  test('should display the active speaker in a larger tile', async ({ page: pageOne, context }) => {
    // navigate to random room
    const roomName = crypto.randomBytes(5).toString('hex');
    const roomUrl = `${baseURL}room/${roomName}?bypass=true`;

    const pageTwo = await context.newPage();

    await pageOne.goto(roomUrl);

    await expect(pageOne.getByTestId('MicNoneIcon')).toBeVisible();

    await pageOne.waitForSelector('.publisher', { state: 'visible' });

    // mute user on the first page
    await pageOne.getByTestId('MicNoneIcon').click();

    // the second user will play an audio file defined in the playwright config and it will become the active speaker
    await pageTwo.goto(roomUrl);

    const publisher = await pageOne.locator('.publisher');

    const subscriber = await pageOne.locator('.subscriber');

    // Wait for the subscriber to become the active speaker and increase its size
    await pageOne.waitForSelector('.subscriber', { state: 'visible' });

    await pageOne.waitForFunction(
      () => {
        const publisher = document.querySelector('.publisher');
        const subscriber = document.querySelector('.subscriber');
        if (!publisher || !subscriber) {
          return false;
        }
        const pubSize = publisher.getBoundingClientRect();
        const subSize = subscriber.getBoundingClientRect();
        return subSize.width > 1.2 * pubSize.width && subSize.height > 2 * pubSize.height;
      },
      { timeout: 10000 }
    );
  });
});
