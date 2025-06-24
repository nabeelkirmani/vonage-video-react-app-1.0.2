import { expect } from '@playwright/test';
import * as crypto from 'crypto';
import { test } from '../fixtures/testWithLogging';
import { openMeetingRoomWithSettings, waitAndClickFirefox } from './utils';

test.describe('chat', () => {
  test.skip(({ isMobile }) => isMobile, 'chat tests only supported on desktop');
  test('should send chat messages and show unread number', async ({
    page: pageOne,
    context,
    browserName,
  }) => {
    const roomName = crypto.randomBytes(5).toString('hex');
    const pageTwo = await context.newPage();

    await openMeetingRoomWithSettings({
      page: pageOne,
      username: 'User One',
      roomName,
    });
    await waitAndClickFirefox(pageOne, browserName);

    await openMeetingRoomWithSettings({
      page: pageTwo,
      username: 'User Two',
      roomName,
    });
    await waitAndClickFirefox(pageTwo, browserName);

    await pageTwo.waitForSelector('.publisher', { state: 'visible' });
    await pageTwo.waitForSelector('.subscriber', { state: 'visible' });

    const chatToggleButtonOne = await pageOne.getByTestId('chat-toggle-unread-count');
    await chatToggleButtonOne.click();

    // Check that chat panel is visible
    await expect(pageOne.getByTestId('chat-panel')).toBeVisible();

    // Send button is disabled when text box empty
    await expect(pageOne.getByTestId('SendIcon')).toBeDisabled();

    await pageOne.getByPlaceholder('Send a message').fill('Hi there, welcome to the meeting!');

    // Send button is enabled when text in box
    await expect(pageOne.getByTestId('SendIcon')).toBeEnabled();

    await pageOne.getByTestId('SendIcon').click();

    // check unread notification is present on page two
    await expect(pageTwo.getByTestId('chat-toggle-unread-count')).toHaveText('1');
    await pageTwo.getByTestId('chat-toggle-unread-count').click();
    await expect(pageTwo.getByTestId('chat-toggle-unread-count')).toHaveText('0');

    await expect(pageTwo.getByTestId('chat-message').getByRole('paragraph')).toHaveText(
      'Hi there, welcome to the meeting!'
    );
    await expect(pageTwo.getByTestId('chat-msg-participant-name')).toHaveText('User One');
    await pageTwo.getByPlaceholder('Send a message').fill('Thanks!');
    await pageTwo.getByTestId('SendIcon').click();

    const messageTwo = await pageTwo.getByTestId('chat-message').nth(1);

    await expect(messageTwo.getByTestId('chat-msg-participant-name')).toHaveText('User Two');
    await expect(messageTwo.getByRole('paragraph')).toHaveText('Thanks!');
  });
});
