import { Button } from '@mui/material';
import { VideoCall } from '@mui/icons-material';
import { ReactElement } from 'react';

export type NewRoomButtonProps = {
  handleNewRoom: () => void;
};

/**
 * NewRoomButton Component
 *
 * This component renders a button to create a new room.
 * @param {NewRoomButtonProps} props - the props for the component.
 *  @property {() => void} handleNewRoom - method that handles the action when user click the 'create room' button.
 * @returns {ReactElement} The new room button component.
 */
const NewRoomButton = ({ handleNewRoom }: NewRoomButtonProps): ReactElement => {
  return (
    <Button
      variant="contained"
      startIcon={<VideoCall />}
      onClick={handleNewRoom}
      fullWidth
      className="h-14 mt-2 normal-case mb-[35px] text-base justify-between w-72 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
    >
      <div className="text-center w-full flex justify-center items-center">Create room</div>
    </Button>
  );
};

export default NewRoomButton;
