import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { useState, useRef, ReactElement } from "react";
import usePublisherContext from "../../../hooks/usePublisherContext";
import VideoOutputDevices from "../VideoOutputDevices";

/**
 * VideoControlButton Component
 *
 * This component displays a current status of video device (camera enabled/disabled)
 * and shows a dropdown that displays available video devices.
 * @returns {ReactElement} The VideoControlButton component.
 */
const VideoControlButton = (): ReactElement => {
  const { isVideoEnabled, toggleVideo } = usePublisherContext();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLInputElement>(null);
  const title = isVideoEnabled ? "Disable video" : "Enable video";

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (
      event.target instanceof HTMLElement &&
      anchorRef.current?.contains(event.target)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="hidden xs:inline">
      <ButtonGroup
        className="mt-1 mr-3 bg-notVeryGray-55"
        disableElevation
        sx={{ borderRadius: "30px" }}
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <IconButton
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="video devices dropdown"
          aria-haspopup="menu"
          title="Open"
          onClick={handleToggle}
          className="h-12 w-12"
          data-testid="video-dropdown-toggle"
        >
          {open ? (
            <ArrowDropDown sx={{ color: "rgb(138, 180, 248)" }} />
          ) : (
            <ArrowDropUp className="text-gray-400" />
          )}
        </IconButton>
        <Tooltip title={title} aria-label="add">
          <IconButton
            onClick={toggleVideo}
            edge="start"
            aria-label="videoCamera"
            size="small"
            className="h-[50px] m-[3px] w-[50px] rounded-full shadow-md"
          >
            {isVideoEnabled ? (
              <VideocamIcon className="text-white" />
            ) : (
              <VideocamOffIcon className="text-red-500" />
            )}
          </IconButton>
        </Tooltip>
      </ButtonGroup>

      <VideoOutputDevices
        handleToggle={handleToggle}
        anchorRef={anchorRef}
        isOpen={open}
        handleClose={handleClose}
      />
    </div>
  );
};

export default VideoControlButton;
