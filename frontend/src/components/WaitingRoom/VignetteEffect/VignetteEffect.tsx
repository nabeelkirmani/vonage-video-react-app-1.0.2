import { ReactElement } from 'react';

/**
 * VignetteEffect Component
 *
 * Adds a vignetting effect to the publisher preview to draw the user's attention
 * toward the center of the image.
 * @returns {ReactElement} - The VignetteEffect component.
 */
const VignetteEffect = (): ReactElement => (
  <div className="absolute w-full h-[328px] shadow-[inset_0px_64px_30px_-20px_rgba(0,0,0,0.4),inset_0px_-64px_30px_-20px_rgba(0,0,0,0.4)]" />
);

export default VignetteEffect;
