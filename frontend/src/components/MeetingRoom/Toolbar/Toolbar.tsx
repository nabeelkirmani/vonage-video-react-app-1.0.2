import { ReactElement, useCallback } from 'react';
import AudioControlButton from '../AudioControlButton';
import VideoControlButton from '../VideoControlButton';
import ScreenSharingButton from '../../ScreenSharingButton';
import TimeRoomNameMeetingRoom from '../TimeRoomName';
import ExitButton from '../ExitButton';
import useSessionContext from '../../../hooks/useSessionContext';
import LayoutToggleButton from '../LayoutToggleButton';
import ParticipantListToggleButton from '../ParticipantListToggleButton';
import ArchivingToggle from '../ArchivingToggle';
import EmojiGrid from '../EmojiGrid';
import ChatToggleButton from '../ChatToggleButton';
import { RightPanelActiveTab } from '../../../hooks/useRightPanel';
import ReportIssueButton from '../ReportIssueButton';

export type ToolbarProps = {
  toggleShareScreen: () => void;
  isSharingScreen: boolean;
  rightPanelActiveTab: RightPanelActiveTab;
  toggleParticipantList: () => void;
  toggleChat: () => void;
  toggleReportIssue: () => void;
  participantCount: number;
};

/**
 * Toolbar Component
 *
 * This component returns the UI for the toolbar that is displayed on the bottom of the meeting room.
 * It displays the following items:
 * - The current time and meeting room name
 * - The microphone state with the ability to toggle it on/off and open a drop-down with some audio settings
 * - The video state with the ability to toggle it on/off and open a dropdown with some video settings
 * - Screensharing button
 * - Button to toggle current layout (grid or active speaker)
 * - Button to express yourself (emojis)
 * - Button to open a pop-up to start meeting recording (archiving)
 * - Button to exit a meeting (redirects to the goodbye page)
 * @param {ToolbarProps} props - the props for the component
 *  @property {() => void} toggleScreenShare - the prop to toggle the screen share on and off
 *  @property {boolean} isSharingScreen - the prop to check if the user is currently sharing a screen
 *  @property {boolean} isParticipantListOpen - the prop to check if the participant list is open
 *  @property {() => void} openParticipantList - the prop to open the participant list
 *  @property {number} participantCount - the prop that holds the current number of participants
 * @returns {ReactElement} - the toolbar component
 */
const Toolbar = ({
  isSharingScreen,
  toggleShareScreen,
  rightPanelActiveTab,
  toggleParticipantList,
  toggleChat,
  toggleReportIssue,
  participantCount,
}: ToolbarProps): ReactElement => {
  const { disconnect, unreadCount, subscriberWrappers } = useSessionContext();
  const isReportIssueEnabled = import.meta.env.VITE_ENABLE_REPORT_ISSUE === 'true';
  const isViewingScreenShare = subscriberWrappers.some((subWrapper) => subWrapper.isScreenshare);
  const isScreenSharePresent = isViewingScreenShare || isSharingScreen;
  const handleLeave = useCallback(() => {
    if (!disconnect) {
      return;
    }
    disconnect();
  }, [disconnect]);

  return (
    <div className="flex flex-col md:flex-row items-center absolute h-[80px] w-full bottom-0 left-0 bg-darkGray-100 md:justify-between p-4">
      <div className="flex flex-1 overflow-hidden justify-start pr-2">
        <TimeRoomNameMeetingRoom />
      </div>
      <div className="flex flex-1 justify-center">
        <AudioControlButton />
        <VideoControlButton />
        <ScreenSharingButton
          toggleScreenShare={toggleShareScreen}
          isSharingScreen={isSharingScreen}
          isViewingScreenShare={isViewingScreenShare}
        />
        <LayoutToggleButton isScreenSharePresent={isScreenSharePresent} />
        <EmojiGrid />
        <ArchivingToggle />
        <ExitButton handleLeave={handleLeave} />
      </div>

      <div className="hidden md:flex flex-1 justify-end">
        {isReportIssueEnabled && (
          <ReportIssueButton
            isOpen={rightPanelActiveTab === 'issues'}
            handleClick={toggleReportIssue}
          />
        )}
        <ParticipantListToggleButton
          isOpen={rightPanelActiveTab === 'participant-list'}
          handleClick={toggleParticipantList}
          participantCount={participantCount}
        />
        <ChatToggleButton
          isOpen={rightPanelActiveTab === 'chat'}
          handleClick={toggleChat}
          unreadCount={unreadCount}
        />
      </div>
    </div>
  );
};

export default Toolbar;
