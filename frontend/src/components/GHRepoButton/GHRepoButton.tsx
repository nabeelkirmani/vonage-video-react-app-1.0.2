import { IconButton, Link, Tooltip } from "@mui/material";
import { MonitorHeart as MonitorHeartIcon } from "@mui/icons-material";
import { ReactElement } from "react";

/**
 * GHRepoButton Component
 *
 * Displays a button with a link to the Vonage Video React App GitHub page.
 * @returns {ReactElement} - The GHRepoButton component.
 */
const GHRepoButton = (): ReactElement => {
  return (
    <Link href="https://www.onasi.care/" target="_blank">
      <Tooltip title="Visit our website">
        <IconButton color="default">
          <MonitorHeartIcon />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default GHRepoButton;
