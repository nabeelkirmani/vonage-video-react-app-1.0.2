import { useLocation } from "react-router-dom";
import { ReactElement } from "react";
import Banner from "../../components/Banner";
import useArchives from "../../hooks/useArchives";
import ArchiveList from "../../components/GoodBye/ArchiveList";
import GoodByeMessage from "../../components/GoodBye/GoodbyeMessage";
import useRoomName from "../../hooks/useRoomName";

/**
 * GoodBye Component
 *
 * This component displays a goodbye message when a user leaves the meeting room.
 * It shows a banner, a set of salutations, and two buttons:
 * - One to re-enter the room
 * - One to go back to the landing page
 * It also shows a list of archives available for download (if applicable).
 * @returns {ReactElement} - the goodbye page.
 */
const GoodBye = (): ReactElement => {
  const location = useLocation();
  const roomName = useRoomName({
    useLocationState: true,
  });
  const archives = useArchives({ roomName });
  const header: string = location.state?.header || "You left the room";
  const caption: string = location.state?.caption || "Thank you";

  return (
    <div className="bg-white flex h-full w-full flex-col items-center">
      <Banner />
      <div className="flex flex-grow items-center justify-center w-full">
        <div className="flex w-full max-w-4xl flex-col items-center p-8 md:flex-row md:items-center md:justify-between">
          <div className="w-full max-w-md">
            <GoodByeMessage
              header={header}
              message={caption}
              roomName={roomName}
            />
          </div>
          <div className="mt-8 w-full max-w-md md:mt-0 md:ml-16">
            <h3 className="text-4xl font-bold text-black">Recordings</h3>
            <div className="mt-4">
              <ArchiveList archives={archives} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodBye;
