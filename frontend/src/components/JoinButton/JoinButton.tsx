import { Button } from '@mui/material';
import { MouseEvent, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

export type JoinButtonProps = {
  roomName: string;
  isDisabled: boolean;
};

/**
 * JoinButton Component
 *
 * This component returns a button that takes a user to the meeting.
 * @param {JoinButtonProps} props - the props for this component.
 *  @property {string} roomName - the name of the room to join.
 * @returns {ReactElement} - the join room button.
 */
const JoinButton = ({ roomName, isDisabled }: JoinButtonProps): ReactElement => {
  const navigate = useNavigate();

  const handleJoin = (event: MouseEvent) => {
    event.preventDefault();
    navigate(`/waiting-room/${roomName}`);
  };

  return (
    <Button
      disabled={roomName === '' || isDisabled}
      className="h-14 normal-case ml-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
      onClick={handleJoin}
    >
      Join
    </Button>
  );
};

export default JoinButton;
