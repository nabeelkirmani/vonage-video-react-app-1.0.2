import { useState, useRef, useCallback } from "react";
import { Publisher, initPublisher } from "@vonage/client-sdk-video";
import useSessionContext from "./useSessionContext";
import useUserContext from "./useUserContext";
import { StreamCreatedEvent } from "../Context/SessionProvider/session";

/**
 * @typedef {object} UseScreenShareType
 * @property {() => void} toggleScreenShare - Function that starts and stop screen sharing
 * @property {boolean} isSharingScreen - Indicates whether you are sharing your screen or not
 */
export type UseScreenShareType = {
  toggleShareScreen: () => Promise<void>;
  isSharingScreen: boolean;
  screensharingPublisher: Publisher | null;
  screenshareVideoElement: HTMLVideoElement | HTMLObjectElement | undefined;
};

/**
 * Hook for toggling screen share and getting the current local screen share status (sharing / not sharing)
 * @returns {UseScreenShareType} useScreenShare
 */
const useScreenShare = (): UseScreenShareType => {
  const { session } = useSessionContext();
  const { user } = useUserContext();

  // Using useRef to store the screen sharing publisher instance
  const screenSharingPub = useRef<Publisher | null>(null);

  // State to track sharing status
  const [isSharingScreen, setIsSharingScreen] = useState<boolean>(false);
  const [screenshareVideoElement, setScreenshareVideoElement] = useState<
    HTMLVideoElement | HTMLObjectElement
  >();

  const onScreenShareStopped = useCallback(() => {
    setIsSharingScreen(false);
    setScreenshareVideoElement(undefined);
    screenSharingPub.current = null;
  }, []);

  const unpublishScreenshare = useCallback(() => {
    if (screenSharingPub.current) {
      session?.unpublish(screenSharingPub.current);
      setIsSharingScreen(false);
    }
  }, [session]);

  const handleStreamCreated = useCallback(
    async (event: StreamCreatedEvent) => {
      if (event.stream.videoType === "screen") {
        unpublishScreenshare();
      }
    },
    [unpublishScreenshare],
  );

  // Using useCallback to memoize the function to avoid unnecessary re-renders
  const toggleShareScreen = useCallback(async () => {
    if (session) {
      if (!isSharingScreen) {
        // Initializing the publisher for screen sharing
        screenSharingPub.current = initPublisher(
          undefined,
          {
            videoSource: "screen",
            insertDefaultUI: false,
            videoContentHint: "detail",
            name: `${user.defaultSettings.name}'s screen`,
          },
          (err) => {
            if (err) {
              onScreenShareStopped();
            }
          },
        );

        // Adding class for screen sharing styling
        screenSharingPub.current?.element?.classList.add("OT_big");

        // Handling stream creation event
        screenSharingPub.current?.on("streamCreated", () => {
          setIsSharingScreen(true);
        });

        screenSharingPub.current?.on("videoElementCreated", (e) => {
          setScreenshareVideoElement(e.element);
        });

        screenSharingPub.current?.on("streamDestroyed", () => {
          onScreenShareStopped();
        });

        // Handling media stopped event
        screenSharingPub.current?.on("mediaStopped", () => {
          onScreenShareStopped();
        });

        // Publishing the screen sharing stream
        session.publish(screenSharingPub.current);

        session?.on("streamCreated", handleStreamCreated);
      } else if (screenSharingPub.current) {
        unpublishScreenshare();
        session?.off("streamCreated", handleStreamCreated);
      }
    }
  }, [
    session,
    isSharingScreen,
    user.defaultSettings.name,
    handleStreamCreated,
    unpublishScreenshare,
    onScreenShareStopped,
  ]);

  return {
    toggleShareScreen,
    isSharingScreen,
    screenshareVideoElement,
    screensharingPublisher: screenSharingPub.current,
  };
};

export default useScreenShare;
