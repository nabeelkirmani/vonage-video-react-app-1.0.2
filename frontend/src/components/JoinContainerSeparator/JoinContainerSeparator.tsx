import { ReactElement } from 'react';
import Separator from '../Separator';

/**
 * JoinContainerSeparator Component
 *
 * Component used as a visual separator between two UI elements.
 * @returns {ReactElement} The JoinContainerSeparator component.
 */
const JoinContainerSeparator = (): ReactElement => {
  return (
    <div className="w-full flex items-center">
      <Separator orientation="left" />
      or
      <Separator orientation="right" />
    </div>
  );
};

export default JoinContainerSeparator;
