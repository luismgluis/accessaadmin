import React, { useState } from "react";
import ConfigIcon from "../../../icons/ConfigIcon";
import ListIcon from "../../../icons/ListIcon";
import MenuIcon from "../../../icons/MenuIcon";
import Panel from "../Panel/Panel";
import HomeBarLeft from "./HomeBarLeft";
import HomeItemBottom from "./HomeItemBottom";
import { HomeCurrentScreen } from "../../../types/HomeCurrentScreen";
import { useTheme } from "../../hooks/useTheme";
import ClockIcon from "../../../icons/ClockIcon";
import ChatIcon from "../../../icons/ChatIcon";
const TAG = "HOME BAR BOTTOM";
type HomeBarBottomProps = {
  onSelect?: (data: HomeCurrentScreen) => void;
};
const HomeBarBottom: React.FC<HomeBarBottomProps> = ({
  onSelect = (val: HomeCurrentScreen) => null,
}) => {
  console.log(TAG);
  const theme = useTheme();
  const containerStyles: React.CSSProperties = {
    borderTopStyle: "solid",
    borderTopColor: theme.colors["color-basic-600"],
  };
  const [selected, setSelected] = useState<HomeCurrentScreen>("");
  const customSelected = (val: HomeCurrentScreen) => {
    setSelected(val);
    onSelect(val);
  };

  return (
    <Panel level="5" flex className="HomeBarBottom" style={containerStyles}>
      {selected !== "menu" && (
        <>
          <HomeItemBottom
            selected={selected === "channels"}
            onPress={() => customSelected("channels")}
            icon={ChatIcon}
          />
          <HomeItemBottom
            selected={selected === "historyAll"}
            onPress={() => customSelected("historyAll")}
            icon={ClockIcon}
          />
          <HomeItemBottom
            selected={selected === "search"}
            onPress={() => customSelected("search")}
            icon={ListIcon}
          />
          <HomeItemBottom
            selected={selected === "config"}
            onPress={() => customSelected("config")}
            icon={ConfigIcon}
          />
        </>
      )}
      <div className="panelLeft">
        {selected === "menu" && (
          <div className="lateralMenu">
            <HomeBarLeft
              marginHeight={50}
              extended={true}
              onSelect={(val) => customSelected(val)}
            />
          </div>
        )}
        <HomeItemBottom
          selected={selected === "menu"}
          onPress={() => customSelected(selected !== "menu" ? "menu" : "")}
          icon={MenuIcon}
        />
      </div>
    </Panel>
  );
};
export default HomeBarBottom;
