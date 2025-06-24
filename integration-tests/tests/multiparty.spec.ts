import { expect } from '@playwright/test';
import * as crypto from 'crypto';
import { test, baseURL } from '../fixtures/testWithLogging';
import { openMeetingRoomWithSettings, waitAndClickFirefox } from './utils';

test('should redirect to the waiting room if not bypassed', async ({ page: pageOne }) => {
  const roomName = crypto.randomBytes(5).toString('hex');
  const roomUrl = `${baseURL}room/${roomName}`;

  await pageOne.goto(roomUrl);

  await expect(pageOne).toHaveURL(`${baseURL}waiting-room/${roomName}`);
});

test('should publish and subscribe with 3 participants', async ({
  page: pageOne,
  context,
  browserName,
}) => {
  const roomName = crypto.randomBytes(5).toString('hex');
  const roomUrl = `${baseURL}room/${roomName}?bypass=true`;

  const pageTwo = await context.newPage();
  const pageThree = await context.newPage();

  await pageOne.goto(roomUrl);
  await pageOne.waitForURL(roomUrl);
  await waitAndClickFirefox(pageOne, browserName);

  await pageTwo.goto(roomUrl);
  await pageTwo.waitForURL(roomUrl);
  await waitAndClickFirefox(pageTwo, browserName);

  await pageThree.goto(roomUrl);
  await pageThree.waitForURL(roomUrl);
  await waitAndClickFirefox(pageThree, browserName);

  await expect(pageThree.locator('.publisher')).toBeVisible({ timeout: 15000 });
  await expect(pageThree.locator('.subscriber')).toBeVisible({ timeout: 15000 });

  await expect(pageThree.locator('.video__element')).toHaveCount(3, { timeout: 15000 });
});

test('should display username on publisher and subscribers', async ({
  page: pageOne,
  context,
  browserName,
}) => {
  const roomName = crypto.randomBytes(5).toString('hex');
  await openMeetingRoomWithSettings({
    page: pageOne,
    username: 'User One',
    roomName,
  });
  await waitAndClickFirefox(pageOne, browserName);

  await expect(pageOne.locator('.publisher')).toBeVisible({ timeout: 15000 });
  await expect(pageOne.getByTestId('publisher-container').getByText('User One')).toBeVisible({
    timeout: 15000,
  });

  const pageTwo = await context.newPage();
  await openMeetingRoomWithSettings({
    page: pageTwo,
    username: 'User Two',
    roomName,
  });
  await waitAndClickFirefox(pageTwo, browserName);

  await expect(pageOne.locator('.subscriber')).toBeVisible({ timeout: 15000 });
  await expect(pageOne.locator('.subscriber').getByText('User Two')).toBeVisible({
    timeout: 15000,
  });
});

test('should display initials on publisher and subscribers', async ({
  page: pageOne,
  browserName,
  context,
}) => {
  const roomName = crypto.randomBytes(5).toString('hex');
  await openMeetingRoomWithSettings({
    page: pageOne,
    username: 'Simone Arianne Biles Owens',
    roomName,
    videoOff: true,
  });
  await waitAndClickFirefox(pageOne, browserName);

  await expect(pageOne.locator('.publisher')).toBeVisible({ timeout: 15000 });
  await expect(pageOne.getByText(/SO/)).toBeVisible({ timeout: 15000 });

  const pageTwo = await context.newPage();
  await openMeetingRoomWithSettings({
    page: pageTwo,
    username: 'Katie Ledecky',
    roomName,
    videoOff: true,
  });
  await waitAndClickFirefox(pageTwo, browserName);

  await expect(pageTwo.locator('.publisher')).toBeVisible({ timeout: 15000 });
  await expect(pageTwo.getByText(/SO/)).toBeVisible({ timeout: 15000 });
  await expect(pageTwo.getByText(/KL/)).toBeVisible({ timeout: 15000 });

  await expect(pageOne.getByText(/KL/)).toBeVisible({ timeout: 15000 });
});

test.describe('display name for screenshare', () => {
  test.skip(
    ({ browserName, isMobile }) => browserName !== 'chromium' || isMobile,
    'screenshare tests only supported on chrome desktop'
  );
  test('should display username on screenshare publisher and subscribers', async ({
    page: pageOne,
    context,
  }) => {
    const roomName = crypto.randomBytes(5).toString('hex');
    await openMeetingRoomWithSettings({
      page: pageOne,
      username: 'User One',
      roomName,
    });

    const pageTwo = await context.newPage();
    await openMeetingRoomWithSettings({
      page: pageTwo,
      username: 'User Two',
      roomName,
    });

    await expect(pageOne.locator('.publisher')).toBeVisible({ timeout: 15000 });
    await expect(pageTwo.locator('.subscriber')).toBeVisible({ timeout: 15000 });
    const screenshareButton = await pageOne.getByTestId('ScreenShareIcon');
    await screenshareButton.click();

    await expect(
      pageOne.getByTestId('screen-publisher-container').getByText(`User One's screen`)
    ).toBeVisible({ timeout: 15000 });

    await expect(pageTwo.locator('.screen-subscriber').getByText(`User One's screen`)).toBeVisible({
      timeout: 15000,
    });
  });
});
