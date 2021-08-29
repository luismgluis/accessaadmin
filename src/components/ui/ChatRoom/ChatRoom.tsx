import "./ChatRoom.scss";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Panel from "../Panel/Panel";
import CText from "../CText/CText";
import ChatMessage from "./ChatMessage";
import ChatMessageType from "./ChatMessageType";
import Api from "../../../api/Api";
import LoadingPanel from "../LoadingPanel/LoadingPanel";
import CButtonImage from "../CButtonImage/CButtonImage";

import { useCurrentUser } from "../../hooks/currentUser";
import { useCustomAlert } from "../../hooks/customAlert";
import utils from "../../../libs/utils/utils";
import CButton from "../CButton/CButton";
import SendIcon from "../../../icons/SendIcon";
import { useTheme } from "../../hooks/useTheme";
const TAG = "CHAT ROOM";
type ChatRoomProps = {
  idRoom?: string;
  title?: string;
  containerHeight?: number;
  getMessages?: (msjs: ChatMessageType[]) => void;
};
const ChatRoom: React.FC<ChatRoomProps> = ({
  idRoom = "",
  containerHeight,
  title = "",
  getMessages = (msjs: ChatMessageType[]) => null,
}) => {
  console.log(TAG, "render");
  const me = useCurrentUser();

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const messagesRef = useRef<ChatMessageType[]>([]);
  const alert = useCustomAlert();
  const [state, setState] = useState(0);
  const [inputText, setInputText] = useState("");
  const refDown = useRef<HTMLDivElement>(null);
  const lastMessagesRef = useRef("");
  const theme = useTheme();
  const scrollToBottom = useCallback(() => {
    try {
      const r = refDown.current!;
      r.scrollIntoView({ behavior: "smooth" });
    } catch (error) {}
  }, [refDown]);

  const filterMessages = useCallback(
    (msjsOriginals: ChatMessageType[], msjs: ChatMessageType[]) => {
      const ids = msjsOriginals.map((item) => item.id);
      const filred = msjs.filter((item) => !ids.includes(item.id));
      const mmm = [...filred, ...msjsOriginals];

      const newArr: ChatMessageType[] = utils.objects.arrayOrderDesc(
        mmm,
        "creationDate"
      );

      if (messagesRef.current.length !== newArr.length) {
        setMessages(newArr);
        messagesRef.current = newArr;
      }
      // return mmm;
    },
    []
  );

  useEffect(() => {
    const unsubs = Api.database.room.getRoomMessages(idRoom, (msjs) => {
      setState(1);
      filterMessages(messagesRef.current, msjs);
    });
    return () => {
      unsubs();
      setState(0);
    };
  }, [idRoom, filterMessages]);

  useEffect(() => {
    if (state === 1) {
      setTimeout(() => {
        scrollToBottom();
      }, 500);
    }
  }, [state, scrollToBottom]);

  const sendMessage = useCallback(() => {
    console.log(inputText);
    if (inputText.length < 1) return;
    const message = new ChatMessageType("", null);
    message.setText(inputText);
    message.creationDate = utils.dates.dateNowUnix();
    message.creator = me.id;
    message.id = "nn";

    Api.database.room.uploadRoomMessage(
      idRoom,
      message,
      () => {
        alert.error("Envio de mensaje fallido");
      },
      () => {
        try {
          scrollToBottom();
        } catch (error) {
          console.log(error);
        }
      }
    );
    setInputText("");
  }, [inputText, idRoom, alert, scrollToBottom, me]);

  const inputHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13 && e.ctrlKey) sendMessage();
    },
    [sendMessage]
  );
  const loadMoreMessages = useCallback(() => {
    const unsubs = Api.database.room.getRoomMessages(
      idRoom,
      (msjs) => {
        setState(2);
        filterMessages(messagesRef.current, msjs);
        unsubs();
      },
      messagesRef.current[0].creationDate
    );
    return () => unsubs();
  }, [idRoom, filterMessages]);

  useEffect(() => {
    if (messages.length > 0) getMessages(messages);
  }, [messages, getMessages]);
  return (
    <Panel className="ChatRoom">
      <Panel level="9" className="ChatRoomTitle">
        <CText color={theme.colors["color-basic-100"]}>{title}</CText>
      </Panel>
      <div
        style={{ height: containerHeight }}
        className="ChatRoomMessagesContainer"
      >
        <Panel level="5" paddingY={5}>
          <CButton
            text="Cargar mas"
            width={180}
            onPress={() => loadMoreMessages()}
          />
        </Panel>
        {state === 0 && <LoadingPanel />}
        {state !== 0 && (
          <>
            {messages.map((item) => {
              const msjDate = utils.dates.unixToDate(item.creationDate!);
              const lastDay = "" + msjDate.getDay();

              if (lastDay !== lastMessagesRef.current) {
                lastMessagesRef.current = lastDay;
                return (
                  <>
                    <Panel level="4">
                      <CText type="p">
                        {utils.dates.dateToString(msjDate)}
                      </CText>
                    </Panel>
                    <ChatMessage message={item} />
                  </>
                );
              }

              return <ChatMessage message={item} />;
            })}
          </>
        )}
        <div ref={refDown}></div>
      </div>
      <Panel level="9" flex flexDirection="row" className="ChatRoomPost">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => inputHandler(e)}
          placeholder="Escribe un mensaje... (crl + ⏎) para enviar"
          type="text"
        />
        <Panel>
          <CButtonImage
            onPress={() => sendMessage()}
            width={50}
            icon={<SendIcon width={50} />}
          />
        </Panel>
      </Panel>
    </Panel>
  );
};
export default ChatRoom;
