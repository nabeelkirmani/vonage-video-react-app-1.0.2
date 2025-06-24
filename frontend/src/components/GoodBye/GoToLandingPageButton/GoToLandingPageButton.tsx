import { Button } from '@mui/material';
import { MouseEvent, ReactElement, TouchEvent } from 'react';

export type GoToLandingPageButtonProps = {
  handleLanding: (event: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>) => void;
};

/**
 * GoToLandingPageButton Component
 *
 * This component returns a button that takes a user back to the landing page
 * @param {GoToLandingPageButtonProps} props - the props for this component.
 *  @property {Function} handleLanding - the function that handles the action of going back to the landing page.
 * @returns {ReactElement} - the button to go back to the landing page.
 */
const GoToLandingPageButton = ({ handleLanding }: GoToLandingPageButtonProps): ReactElement => {
  return (
    <Button
      variant="contained"
      className="h-12 normal-case text-base mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
      onClick={handleLanding}
      fullWidth
    >
      Return to landing page
    </Button>
  );
};

export default GoToLandingPageButton;
