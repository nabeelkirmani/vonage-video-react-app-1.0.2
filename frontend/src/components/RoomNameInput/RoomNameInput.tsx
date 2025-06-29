import { SetStateAction, Dispatch, ReactElement, ChangeEvent } from "react";
import { Keyboard } from "@mui/icons-material";
import isValidRoomName from "../../utils/isValidRoomName";

export type RoomNameInputProps = {
  setRoomName: Dispatch<SetStateAction<string>>;
  roomName: string;
  hasError: boolean;
  setHasError: Dispatch<SetStateAction<boolean>>;
};

/**
 * RoomNameInput Component
 *
 * Input box for setting a custom room name.
 * @param {RoomNameInputProps} props - The props for the component.
 *  @property {Dispatch<SetStateAction<string>>} setRoomName - Function to update the room name.
 *  @property {string} roomName - The room name set by the user.
 *  @property {boolean} hasError - The error state indicating whether user added an input with an error.
 *  @property {Dispatch<SetStateAction<boolean>>} setHasError - Function to update the error state.
 * @returns {ReactElement} - The RoomNameInput component.
 */
const RoomNameInput = ({
  setRoomName,
  roomName,
  hasError,
  setHasError,
}: RoomNameInputProps): ReactElement => {
  const handleChange = (textChangeEvent: ChangeEvent<HTMLInputElement>) => {
    const newValue = textChangeEvent.target.value.toLowerCase();

    if (newValue === "") {
      // If the input is empty, reset the room name and clear the error
      setRoomName("");
      setHasError(false);
      return;
    }

    if (isValidRoomName(newValue)) {
      setHasError(false);
      setRoomName(newValue);
    } else {
      setHasError(true);
    }
  };
  return (
    <div className="relative w-52">
      <label htmlFor="room-name">
        <span className="sr-only">Enter room name</span>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Keyboard className="text-gray-400" />
        </div>
        <input
          id="room-name"
          type="text"
          className="w-full h-14 pl-10 pr-2 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 peer"
          placeholder="Enter room name"
          value={roomName}
          onChange={handleChange}
          maxLength={60}
        />
      </label>
      {hasError && (
        <p className="mt-2 text-sm text-red-600">
          No spaces or special characters allowed
        </p>
      )}
    </div>
  );
};

export default RoomNameInput;
