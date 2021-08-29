import "./Channels.scss";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useCurrentGroup } from "../../hooks/currentGroup";
import Panel from "../../ui/Panel/Panel";
import { useScreenSize } from "../../hooks/windowResize";
import ChatRoom from "../../ui/ChatRoom/ChatRoom";
import { Select } from "@itwin/itwinui-react";
import Api from "../../../api/Api";
import LoadingPanel from "../../ui/LoadingPanel/LoadingPanel";
import CText from "../../ui/CText/CText";
import { useTheme } from "../../hooks/useTheme";
import utils from "../../../libs/utils/utils";
import ChatMessageType from "../../ui/ChatRoom/ChatMessageType";
import CButton from "../../ui/CButton/CButton";

import CsvDownloader from "react-csv-downloader";
const TAG = "Channels SEARCH";
type SelectOption = {
  value: string;
  label: string;
};
type ChannelsProps = {
  prop1?: any;
};
const Channels: React.FC<ChannelsProps> = ({ prop1 }) => {
  console.log(TAG, "render");
  const group = useCurrentGroup();
  const screen = useScreenSize(false);
  const theme = useTheme();
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [state, setState] = useState(0);
  const [value, setValue] = useState<string | undefined>(undefined);
  const roomMessages = useRef<ChatMessageType[]>([]);
  const [msjs, setMsjs] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    Api.database.group.getChannels(group.id).then((data) => {
      const newData: SelectOption[] = data.map((item) => ({
        value: item.chatRoomID,
        label: item.name,
      }));
      setState(1);
      setOptions(newData);
    });
  }, [group]);

  const DownLoadButton = useMemo(() => {
    console.log(msjs);
    const data: any = msjs.map((i) => {
      Object.values(i.exportToUpload());
    });
    return (
      <CsvDownloader
        filename={`chat_history_accessa`}
        extension=".csv"
        separator={"\t"}
        // wrapColumnChar="'"
        // columns={tableColumns[0].columns.map((item) => ({
        //   id: item.id,
        //   displayName: item.Header,
        // }))}

        datas={data}
        text="DOWNLOAD"
      >
        <CButton
          className="ChannelsDownload"
          text="Descargar mensajes visibles"
        ></CButton>
      </CsvDownloader>
    );
  }, [msjs]);

  return (
    <div className="Channels">
      <Panel width={screen.minSize("sm") ? "60%" : undefined}>
        <Panel paddingX={50} paddingY={10}>
          {options.length === 0 && <LoadingPanel />}
          {state !== 0 && options.length === 0 && (
            <CText>Sin canales encontrados</CText>
          )}
          {options.length > 0 && (
            <Select
              placeholder="Selecciona el canal"
              options={options}
              value={value}
              onChange={setValue}
            />
          )}
        </Panel>
        {!value && (
          <Panel>
            <CText type="h5" color={theme.colors["color-basic-600"]}>
              Aun no haz seleccionado ningun canal de comunicacion.
            </CText>
          </Panel>
        )}
        {value && (
          <div>
            <Panel>{DownLoadButton}</Panel>
            <Panel>
              <ChatRoom
                key={"chatroom" + value}
                containerHeight={500}
                idRoom={value}
                title={options.find((el) => el.value === value)?.label}
                getMessages={(data) => {
                  if (roomMessages.current.length !== data.length) {
                    setMsjs(data);
                    roomMessages.current = data;
                  }
                }}
              />
            </Panel>
          </div>
        )}
      </Panel>
    </div>
  );
};
export default Channels;
