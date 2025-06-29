import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import {
  CircularProgress,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { ReactElement } from "react";
import { Archive, ArchiveStatus } from "../../../api/archiving/model";

const ArchiveDownloadButton = ({
  url,
  id,
}: {
  id: string;
  url: string | undefined;
}) => {
  return (
    <Link href={url} target="_blank">
      <Tooltip title={`Download recording ${id}`}>
        <IconButton>
          <FileDownloadOutlinedIcon data-testid="archive-download-button" />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

const ArchiveErrorIcon = () => (
  <Tooltip title="This recording failed or is expired">
    <WarningOutlinedIcon
      color="warning"
      sx={{
        alignItems: "center",
        display: "flex",
        width: "40px",
        height: "40px",
        padding: "8px",
        justifyContent: "center",
      }}
      data-testid="archive-error-icon"
    />
  </Tooltip>
);

const ArchivingLoadingIcon = () => (
  <Tooltip title="This recording is not ready for download yet">
    <CircularProgress
      data-testid="archive-loading-spinner"
      sx={{
        padding: "8px",
      }}
    />
  </Tooltip>
);

const ArchiveStatusIcon = ({
  status,
  url,
  id,
}: {
  id: string;
  status: ArchiveStatus;
  url: string | null;
}) => {
  if (status === "available") {
    return <ArchiveDownloadButton id={id} url={url ?? undefined} />;
  }
  if (status === "pending") {
    return <ArchivingLoadingIcon />;
  }
  return <ArchiveErrorIcon />;
};

export type ArchiveListProps = {
  archives: Archive[] | "error";
};

/**
 * ArchiveList
 *
 * This component displays any archives.
 * @param {ArchiveListProps} props - The props for the component.
 *  @property {Archive[] | 'error'} archives - Array of archives, or 'error'.
 * @returns {ReactElement} - The ArchiveList component.
 */
const ArchiveList = ({ archives }: ArchiveListProps): ReactElement => {
  if (archives === "error") {
    return (
      <div className="flex items-center rounded-md bg-red-50 p-4">
        <WarningOutlinedIcon className="text-red-500" />
        <p className="ml-4 text-red-700">
          There was an error loading recordings for this meeting.
        </p>
      </div>
    );
  }
  if (!archives.length) {
    return (
      <div className="flex items-center rounded-md bg-gray-50 p-4">
        <p className="text-gray-500">
          No recordings were found for this meeting.
        </p>
      </div>
    );
  }
  return (
    <div className="md:max-h-[480px] md:overflow-y-auto ">
      <List sx={{ overflowX: "auto" }}>
        {archives.map((archive, index) => {
          return (
            <ListItem
              data-testid={`archive-list-item-${archive.id}`}
              key={archive.id}
              secondaryAction={
                <ArchiveStatusIcon
                  id={archive.id}
                  url={archive.url}
                  status={archive.status}
                />
              }
            >
              <ListItemText
                primary={`Recording ${archives.length - index}`}
                secondary={`Started at: ${archive.createdAtFormatted}`}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default ArchiveList;
