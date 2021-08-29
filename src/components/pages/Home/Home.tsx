import "./Home.scss";
import React, { useMemo, useState } from "react";

import { useScreenSize } from "../../hooks/windowResize";
import Col from "../../ui/Grid/Col";
import HomeBarBottom from "../../ui/HomeBar/HomeBarBottom";
import HomeBarLeft from "../../ui/HomeBar/HomeBarLeft";
import HomeBarTop from "../../ui/HomeBar/HomeBarTop";
import Panel from "../../ui/Panel/Panel";
import Row from "../../ui/Grid/Row";
import Contact from "../Contact/Contact";
import { HomeCurrentScreen } from "../../../types/HomeCurrentScreen";
import { useCurrentUser } from "../../hooks/currentUser";
import { Redirect } from "react-router-dom";
import ResidentsNew from "../ResidentsNew/ResidentsNew";
import ResidentHistory from "../ResidentsHistory/ResidentsHistory";
import ResidentsSearch from "../ResidentsSearch/ResidentsSearch";
import { useCurrentGroup } from "../../hooks/currentGroup";
import GroupSelect from "../GroupSelect/GroupSelect";
import { useHomeGoTo, useSetHomeGoTo } from "../../hooks/useHomeGoTo";
import Config from "../Config/Config";
import Channels from "../Channels/Channels";

const TAG = "HOME";

type HomeProps = {};
const Home: React.FC<HomeProps> = () => {
  console.log(TAG, "Home start");
  const screen = useScreenSize(false);
  const bottomBarHeight = screen.maxSize("sm") ? 50 : 0;
  const me = useCurrentUser();
  const group = useCurrentGroup();

  const homeGoTo = useHomeGoTo();
  const setCurrentScreen = useSetHomeGoTo();

  const customSelected = (val: HomeCurrentScreen) => {
    console.log(TAG, val);
    if (val !== "" && val !== "menu") setCurrentScreen(val);
  };
  const [screenElement, screenTitle] = useMemo(() => {
    if (group.isEmpty()) {
      return [<GroupSelect loadLast />, "Escoger Grupo"];
    }
    switch (homeGoTo.screen) {
      case "config":
        return [<Config />, "Configuración"];
      case "channels":
        return [<Channels />, "Minuta - Canales de comunicación"];
      case "new":
        return [<ResidentsNew />, "Nuevo Usuario"];
      case "history":
        return [
          <ResidentHistory parms={homeGoTo.parms} />,
          "Historial de accesos",
        ];
      case "historyAll":
        return [
          <ResidentHistory parms={"ALL"} />,
          "Historial de accesos - todos",
        ];
      case "search":
        return [<ResidentsSearch />, "Buscar Usuarios"];
      case "selectGroup":
        return [<GroupSelect />, "Escoger Grupo"];
      default:
        return [<ResidentsSearch />, "Buscar Usuarios"];
    }
  }, [group, homeGoTo]);

  if (me.isEmpty()) {
    return <Redirect to={{ pathname: "/login", state: { from: "Home" } }} />;
  }

  console.log(TAG, "creen.maxSize ", screen.maxSize("sm"));
  return (
    <Panel level="1" className="Home">
      <Panel
        flex
        // height={screen.winY - bottomBarHeight}
      >
        <Row flex={1}>
          {screen.minSize("md") && !group.isEmpty() && (
            <Col maxWidth={50}>
              <HomeBarLeft onSelect={(val) => customSelected(val)} />
            </Col>
          )}
          <Col>
            <HomeBarTop
              title={screenTitle}
              onSelect={(val) => customSelected(val)}
            />
            <Panel
              className="homeContainer"
              level="1"
              // width={screen.winX - (!screen.maxSize("xs") ? 50 : 0)}
              // height={screen.winY - 35 - bottomBarHeight}
            >
              {screenElement}
            </Panel>
          </Col>
        </Row>
      </Panel>
      {screen.maxSize("sm") && !group.isEmpty() && (
        <Panel className="homeBottomBar">
          <HomeBarBottom onSelect={(val) => customSelected(val)} />
        </Panel>
      )}
    </Panel>
  );
};
export default Home;
