import { Button } from "@mui/material";
import { MouseEvent, ReactElement, TouchEvent } from "react";

export type ReenterRoomButtonProps = {
  handleReenter: (
    event: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>,
  ) => void;
  roomName: string;
};

/**
 * ReenterRoomButton Component
 *
 * This component returns a button that takes a user back to the meeting.
 * @param {ReenterRoomButtonProps} props - the props for this component.
 *  @property {Function} handleReenter - the function that handles the action of re-entering.
 *  @property {string} roomName - the name of the room to rejoin.
 * @returns {ReactElement} - the re-enter room button or an empty string if the room does not exist.
 */
const ReenterRoomButton = ({
  handleReenter,
  roomName,
}: ReenterRoomButtonProps): ReactElement | string => {
  return (
    roomName && (
      <Button
        variant="outlined"
        className="h-12 normal-case text-base mr-2 mb-4 py-2 px-4 rounded-lg transition"
        onClick={handleReenter}
      >
        Re-enter
      </Button>
    )
  );
};

export default ReenterRoomButton;
