import React, {
  Dispatch,
  MouseEvent,
  ReactElement,
  SetStateAction,
  useState,
} from "react";
import { PersonOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useUserContext from "../../../hooks/useUserContext";
import { UserType } from "../../../Context/user";
import useRoomName from "../../../hooks/useRoomName";
import isValidRoomName from "../../../utils/isValidRoomName";

export type UserNameInputProps = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
};

/**
 * UsernameInput Component
 *
 * Handles setting the username and navigating to the meeting room.
 * @param {UserNameInputProps} props - The props for the component.
 *  @property {string} username - The user's name
 *  @property {Dispatch<SetStateAction<string>>} setUsername - Function to update the user's username.
 * @returns {ReactElement} The UsernameInput component.
 */
const UsernameInput = ({
  username,
  setUsername,
}: UserNameInputProps): ReactElement => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const roomName = useRoomName();
  const [isUserNameInvalid, setIsUserNameInvalid] = useState(false);

  const onChangeParticipantName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUserName = e.target.value;
    if (inputUserName === "" || inputUserName.trim() === "") {
      // Space detected
      setUsername("");
      return;
    }
    setIsUserNameInvalid(false);
    setUsername(inputUserName);
  };

  const validateForm = () => {
    if (username === "") {
      setIsUserNameInvalid(true);
      return false;
    }
    return true;
  };

  const handleJoinClick = (event: MouseEvent) => {
    event.preventDefault();
    if (validateForm() && roomName) {
      if (!isValidRoomName(roomName)) {
        return;
      }
      setUser((prevUser: UserType) => ({
        ...prevUser,
        defaultSettings: {
          ...prevUser.defaultSettings,
          name: username,
        },
      }));
      window.localStorage.setItem("username", username);
      // This takes the user to the meeting room and allows them to enter it
      // Otherwise if they entered the room directly, they are going to be redirected back to the waiting room
      // Setting hasAccess is required so that we are not redirected back to the waiting room
      navigate(`/room/${roomName}`, {
        state: {
          hasAccess: true,
        },
      });
    }
  };

  return (
    <form className="flex flex-col justify-center items-left md:max-w-[480px] w-full px-6 md:relative md:top-[-48px]">
      <div className="flex items-center flex-col justify-end mt-4">
        <div className="leading-8 mb-2 font-sans text-[28px]">
          Prepare to join:
        </div>
        <div className="flex py-2 decoration-solid text-l flex-col content-end md:max-w-[480px] w-full">
          <p className="truncate">{roomName}</p>
        </div>
        <div className="leading-8 mt-6 font-sans text-[24px]">
          What is your name?
        </div>
        <div className="w-full flex flex-wrap items-center justify-center mb-5">
          <div className="relative w-full max-w-xs">
            <label htmlFor="user-name">
              <span className="sr-only">Enter your name</span>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PersonOutline className="text-gray-400" />
              </div>
              <input
                id="user-name"
                type="text"
                className="w-full h-12 pl-10 pr-2 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 peer"
                placeholder="Enter your name"
                value={username}
                onChange={onChangeParticipantName}
                maxLength={60}
                required
              />
            </label>
            {isUserNameInvalid && (
              <p className="mt-2 text-sm text-red-600">
                Please enter your name.
              </p>
            )}
          </div>
        </div>
        <button
          onClick={handleJoinClick}
          className="w-28 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white normal-case text-sm transition disabled:opacity-50"
          disabled={!username}
          type="submit"
        >
          Join
        </button>
      </div>
    </form>
  );
};

export default UsernameInput;
