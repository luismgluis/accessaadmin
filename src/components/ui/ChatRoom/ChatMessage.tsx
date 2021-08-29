import "./ChatMessage.scss";
import React, { useState, useEffect } from "react";
import CText from "../CText/CText";
import ChatMessageType from "./ChatMessageType";
import UserType from "../../../types/UserType";
import Api from "../../../api/Api";
import Panel from "../Panel/Panel";
import { useCurrentUser } from "../../hooks/currentUser";
import "react-h5-audio-player/src/styles.scss";
import AudioPlayer from "react-h5-audio-player";
import utils from "../../../libs/utils/utils";

const TAG = "CHAT MESSAGE";
type ChatMessageProps = {
  message: ChatMessageType;
};
const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  console.log(TAG, "render");
  const [creator, setCreator] = useState<UserType | null>(null);
  const me = useCurrentUser();

  useEffect(() => {
    Api.database.user.getUser(message.creator).then((data) => {
      setCreator(data);
    });
  }, [message]);

  const isme = me.id === message.creator;
  return (
    <Panel className="ChatMessage">
      <div className="ChatMessageBody">
        <Panel
          level="5"
          className={`ChatMessageContainer ${isme ? "right" : "left"}`}
        >
          <CText className="ChatMessageDate" type="p">
            {message.creationDate &&
              utils.dates.dateToString(
                utils.dates.unixToDate(message.creationDate),
                true
              )}
          </CText>
          {creator && (
            <CText className={"ChatMessageCreator"} type="p">
              {creator.name}
            </CText>
          )}
          {message.type === "text" && (
            <CText className="ChatMessageText">{message.text}</CText>
          )}
          {message.type === "image" && (
            <img
              className={"ChatMessageImage"}
              src={message.fileUrl}
              alt={`imagen enviada por ${creator?.name}`}
            />
          )}
          {message.type === "audio" && (
            <div style={{ width: 300, height: 120, paddingTop: 10 }}>
              <AudioPlayer
                // autoPlay

                src={message.fileUrl}
                onPlay={(e) => console.log("onPlay")}
                // other props here
              />
            </div>
          )}
        </Panel>
      </div>
    </Panel>
  );
};
export default ChatMessage;
