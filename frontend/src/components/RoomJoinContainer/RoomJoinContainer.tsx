import { useNavigate } from 'react-router-dom';
import { ReactElement } from 'react';
import generateRoomName from '../../utils/generateRoomName';
import NewRoomButton from '../NewRoomButton';
import JoinContainerSeparator from '../JoinContainerSeparator';
import JoinExistingRoom from '../JoinExistingRoom';

/**
 * RoomJoinContainer Component
 *
 * This component renders UI elements for creating a new room or joining an existing one.
 * @returns {ReactElement} The room join container component.
 */
const RoomJoinContainer = (): ReactElement => {
  const navigate = useNavigate();
  const randomRoom = generateRoomName();

  // After a room is created, the user is redirected to a waiting room
  // where they have an option to pick their devices, add their name, and join the meeting room
  const handleNewRoom = () => {
    navigate(`/waiting-room/${randomRoom}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-8">
      <NewRoomButton handleNewRoom={handleNewRoom} />
      <JoinContainerSeparator />
      <JoinExistingRoom />
    </div>
  );
};

export default RoomJoinContainer;
