import { ReactElement, useState } from 'react';
import JoinButton from '../JoinButton';
import RoomNameInput from '../RoomNameInput';

/**
 * JoinExistingRoom Component
 *
 * Displays a text box and button to join the waiting room for a custom room.
 * @returns {ReactElement} - The JoinExistingRoom component.
 */
const JoinExistingRoom = (): ReactElement => {
  const [roomName, setRoomName] = useState('');
  const [hasError, setHasError] = useState(false);

  return (
    <form className="flex items-center w-full max-w-sm mt-8">
      <div className="flex-grow">
        <RoomNameInput
          setRoomName={setRoomName}
          roomName={roomName}
          hasError={hasError}
          setHasError={setHasError}
        />
      </div>
      <div className="ml-4">
        <JoinButton roomName={roomName} isDisabled={hasError} />
      </div>
    </form>
  );
};

export default JoinExistingRoom;
