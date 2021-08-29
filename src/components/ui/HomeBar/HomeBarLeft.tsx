import React, { useState } from "react";
import "./HomeBar.scss";

import Panel from "../Panel/Panel";

import HomeItemLeft from "./HomeItemLeft";
import ConfigIcon from "../../../icons/ConfigIcon";
import ListIcon from "../../../icons/ListIcon";
import ProfileIcon from "../../../icons/ProfileIcon";
import AddIcon from "../../../icons/AddIcon";
import { HomeCurrentScreen } from "../../../types/HomeCurrentScreen";
import { useScreenSize } from "../../hooks/windowResize";
import { useTheme } from "../../hooks/useTheme";
import AppIcon from "../../../icons/AppIcon/AppIcon";
import ClockIcon from "../../../icons/ClockIcon";
import ChatIcon from "../../../icons/ChatIcon";
const TAG = "HOME BAR LEFT";

type HomeBarLeftProps = {
  extended?: boolean;
  marginHeight?: number;
  onSelect?: (data: HomeCurrentScreen) => void;
};
const HomeBarLeft: React.FC<HomeBarLeftProps> = ({
  onSelect = () => null,
  extended = false,
  marginHeight = 0,
}) => {
  console.log(TAG);
  console.log(TAG, "render");
  const [expand, setExpand] = useState(extended);
  const theme = useTheme();
  const screen = useScreenSize(true);
  const [selected, setSelected] = useState<HomeCurrentScreen>("");
  const customSelected = (val: HomeCurrentScreen) => {
    console.log(TAG, val);
    setSelected(val);
    onSelect(val);
  };
  const containerStyles: React.CSSProperties = {
    height: screen.winY - marginHeight,
    width: expand ? 150 : 50,
    maxWidth: expand ? 150 : 50,
    background: theme.colors["color-basic-500"],
    position: "absolute",
    borderRightStyle: "solid",
    borderRightColor: theme.colors["color-basic-600"],
    zIndex: 1,
    justifyContent: "flex-start",
    // alignItems: "center",
  };

  return (
    <Panel
      level="5"
      style={containerStyles}
      totalHeight={1}
      // verticalCenter
      flex
      className="HomeBarLeft"
    >
      <div className="top">
        <HomeItemLeft
          icon={AppIcon}
          expanded={expand}
          text="Accessa"
          description="Accessa - Expandir menu"
          onPress={() => setExpand(!expand)}
        />
      </div>

      <Panel className="middle">
        <div>
          <HomeItemLeft
            icon={ChatIcon}
            expanded={expand}
            text="Minuta"
            description="Minuta - Canales de comunicacion"
            selected={selected === "channels"}
            onPress={() => customSelected("channels")}
          />
          <HomeItemLeft
            icon={ClockIcon}
            expanded={expand}
            text="Historial"
            description="Historial de ingresos"
            selected={selected === "historyAll"}
            onPress={() => customSelected("historyAll")}
          />
          <HomeItemLeft
            icon={ListIcon}
            expanded={expand}
            text="Listado"
            description="Listado de usuarios"
            selected={selected === "search"}
            onPress={() => customSelected("search")}
          />
        </div>
      </Panel>

      <div className="bottom">
        <HomeItemLeft
          icon={ConfigIcon}
          expanded={expand}
          text="Opciones"
          description="Configuración"
          selected={selected === "config"}
          onPress={() => customSelected("config")}
        />
      </div>
    </Panel>
  );
};
export default HomeBarLeft;
