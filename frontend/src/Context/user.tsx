import {
  createContext,
  useState,
  useMemo,
  ReactNode,
  SetStateAction,
  Dispatch,
  ReactElement,
} from "react";

// Define the shape of the User context
export type UserContextType = {
  setUser: Dispatch<SetStateAction<UserType>>; // Function to update the user state
  user: UserType; // The current user state
};

// Define the structure of the User object
export type UserType = {
  defaultSettings: {
    publishAudio: boolean; // Whether the user is publishing audio
    publishVideo: boolean; // Whether the user is publishing video
    name: string; // The user's name
    blur: boolean; // Whether background blur is enabled
    noiseSuppression: boolean; // Whether noise suppression is enabled
    audioSource?: string; // The selected audio input source (optional)
    videoSource?: string; // The selected video input source (optional)
  };
  issues: {
    reconnections: number; // The number of reconnections the user has experienced
    audioFallbacks: number; // The number of times the user's audio has fallen back to a different input
  };
  initials?: string; // The user's initials (optional)
};

// Create the User context with an initial value of null
export const UserContext = createContext<UserContextType | null>(null);

export type UserProviderProps = {
  children: ReactNode;
};

/**
 * UserProvider component to wrap the application and provide the User preferences to be used by the publisher.
 * @param {UserProviderProps} props - The props for the context.
 * @returns {ReactElement} a context provider for the User.
 */
const UserProvider = ({ children }: UserProviderProps): ReactElement => {
  // Load initial settings from local storage
  const noiseSuppression =
    window.localStorage.getItem("noiseSuppression") === "true";
  const blur = window.localStorage.getItem("backgroundBlur") === "true";
  const name = window.localStorage.getItem("username") ?? "";

  const [user, setUser] = useState<UserType>({
    defaultSettings: {
      publishAudio: true,
      publishVideo: true,
      name,
      blur,
      noiseSuppression,
      audioSource: undefined,
      videoSource: undefined,
    },
    issues: {
      reconnections: 0, // Start with zero reconnections
      audioFallbacks: 0, // Start with zero audio fallbacks
    },
  });

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );

  // Provide the User context to child components
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
