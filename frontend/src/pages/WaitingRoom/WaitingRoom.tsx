import {
  useState,
  useEffect,
  MouseEvent,
  ReactElement,
  TouchEvent,
  useCallback,
} from "react";
import usePreviewPublisherContext from "../../hooks/usePreviewPublisherContext";
import ControlPanel from "../../components/WaitingRoom/ControlPanel";
import VideoContainer from "../../components/WaitingRoom/VideoContainer";
import UsernameInput from "../../components/WaitingRoom/UserNameInput";
import { DEVICE_ACCESS_STATUS } from "../../utils/constants";
import DeviceAccessAlert from "../../components/DeviceAccessAlert";
import Banner from "../../components/Banner";
import useIsSmallViewport from "../../hooks/useIsSmallViewport";

/**
 * WaitingRoom Component
 *
 * This component renders the waiting room page of the application, including:
 * - A banner containing a company logo, a date-time widget, and a navigable button to a GitHub repo.
 * - A video element showing the user how they'll appear upon joining a room containing controls to:
 *   - Mute their audio input device.
 *   - Disable their video input device.
 *   - Toggle on/off background blur (if supported).
 * - Audio input, audio output, and video input device selectors.
 * - A username input field.
 * - The meeting room name and a button to join the room.
 * @returns {ReactElement} - The waiting room.
 */
const WaitingRoom = (): ReactElement => {
  const { initLocalPublisher, publisher, accessStatus, destroyPublisher } =
    usePreviewPublisherContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAudioInput, setOpenAudioInput] = useState<boolean>(false);
  const [openVideoInput, setOpenVideoInput] = useState<boolean>(false);
  const [openAudioOutput, setOpenAudioOutput] = useState<boolean>(false);
  const [username, setUsername] = useState(
    window.localStorage.getItem("username") ?? "",
  );
  const isSmallViewport = useIsSmallViewport();

  useEffect(() => {
    if (!publisher) {
      initLocalPublisher();
    }

    return () => {
      // Ensure we destroy the publisher and release any media devices.
      if (publisher) {
        destroyPublisher();
      }
    };
  }, [initLocalPublisher, publisher, destroyPublisher]);

  // After changing device permissions, reload the page to reflect the device's permission change.
  useEffect(() => {
    if (accessStatus === DEVICE_ACCESS_STATUS.ACCESS_CHANGED) {
      window.location.reload();
    }
  }, [accessStatus]);

  const handleAudioInputOpen = useCallback(
    (event: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpenAudioInput(true);
    },
    [],
  );

  const handleVideoInputOpen = useCallback(
    (event: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpenVideoInput(true);
    },
    [],
  );

  const handleAudioOutputOpen = useCallback(
    (event: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpenAudioOutput(true);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setOpenAudioInput(false);
    setOpenAudioOutput(false);
    setOpenVideoInput(false);
  }, []);

  return (
    <div
      className="h-full w-full bg-white flex flex-col"
      data-testid="waitingRoom"
    >
      <Banner />
      <div className="flex w-full">
        <div className="w-full flex justify-center mb-8">
          <div className="sm:min-h-[90vh] flex flex-col md:flex-row items-center justify-center w-full">
            <div
              className={`flex-col max-w-full ${isSmallViewport ? "" : "h-[394px]"} sm: inline-flex`}
            >
              <VideoContainer username={username} />
              {accessStatus === DEVICE_ACCESS_STATUS.ACCEPTED && (
                <ControlPanel
                  handleAudioInputOpen={handleAudioInputOpen}
                  handleVideoInputOpen={handleVideoInputOpen}
                  handleAudioOutputOpen={handleAudioOutputOpen}
                  handleClose={handleClose}
                  openAudioInput={openAudioInput}
                  openVideoInput={openVideoInput}
                  openAudioOutput={openAudioOutput}
                  anchorEl={anchorEl}
                />
              )}
            </div>
            <UsernameInput username={username} setUsername={setUsername} />
          </div>
        </div>
        {accessStatus !== DEVICE_ACCESS_STATUS.ACCEPTED && (
          <DeviceAccessAlert accessStatus={accessStatus} />
        )}
      </div>
    </div>
  );
};

export default WaitingRoom;
