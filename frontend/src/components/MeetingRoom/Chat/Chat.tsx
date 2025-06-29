import { ReactElement } from "react";
import { List } from "@mui/material";
import getInitials from "../../../utils/getInitials";
import getParticipantColor from "../../../utils/getParticipantColor";
import ChatMessage from "../ChatMessage";
import ChatInput from "../ChatInput";
import useSessionContext from "../../../hooks/useSessionContext";
import RightPanelTitle from "../RightPanel/RightPanelTitle";

export type ChatProps = {
  handleClose: () => void;
  isOpen: boolean;
};

/**
 * Chat component
 * Renders a scrollable chat container
 * @param {ChatProps} props - props for this component
 *  @property {() => void} handleClose - close handler
 *  @property {boolean} isOpen - true if chat is open
 * @returns {ReactElement | false} - Chat component
 */
const Chat = ({ handleClose, isOpen }: ChatProps): ReactElement | false => {
  const { messages } = useSessionContext();
  const heightClass = "@apply h-[calc(100vh_-_240px)]";

  return (
    isOpen && (
      <>
        <RightPanelTitle title="Chat" handleClose={handleClose} />
        <div className={`flex flex-col-reverse overflow-y-auto ${heightClass}`}>
          <List>
            {messages.map((msg) => {
              return (
                <ChatMessage
                  key={msg.timestamp}
                  name={msg.participantName}
                  message={msg.message}
                  initials={getInitials(msg.participantName)}
                  avatarColor={getParticipantColor(msg.participantName)}
                  timestamp={msg.timestamp}
                />
              );
            })}
          </List>
        </div>
        <div className="flex absolute bottom-0 inset-x-0">
          <ChatInput />
        </div>
      </>
    )
  );
};

export default Chat;
