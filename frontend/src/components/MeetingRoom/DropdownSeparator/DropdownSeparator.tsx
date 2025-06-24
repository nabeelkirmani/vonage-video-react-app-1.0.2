import { ReactElement } from 'react';

/**
 * DropdownSeparator Component
 *
 * This component renders a horizontal separator line.
 * @returns {ReactElement} The DropdownSeparator component.
 */
const DropdownSeparator = (): ReactElement => {
  return <div className="border-b border-solid w-full border-gray-300/25" />;
};

export default DropdownSeparator;
