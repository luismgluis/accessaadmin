import "./HomeBar.scss";
import React, { useState } from "react";
import Panel from "../Panel/Panel";
import ProfileIcon from "./../../../icons/ProfileIcon";
import CText from "../CText/CText";
import { HomeCurrentScreen } from "../../../types/HomeCurrentScreen";
import { useCurrentUser, useSetCurrentUser } from "../../hooks/currentUser";
import { useTheme } from "../../hooks/useTheme";
import AppIconWhite from "../../../icons/AppIcon/AppIconWhite";
import { useScreenSize } from "../../hooks/windowResize";
import Api from "../../../api/Api";
import UserType from "../../../types/UserType";
import { useCustomAlert } from "../../hooks/customAlert";
import utils from "../../../libs/utils/utils";
import { useHistory } from "react-router-dom";
import { useSetCurrentGroup } from "../../hooks/currentGroup";
import GroupType from "../../../types/GroupType";
import { useCallback } from "react";
const TAG = "HOME BAR TOP";
type HomeBarTopProps = {
  title: string;
  onSelect?: (data: HomeCurrentScreen) => void;
};
const HomeBarTop: React.FC<HomeBarTopProps> = ({
  onSelect = () => null,
  title,
}) => {
  const theme = useTheme();
  const panelRightStyles: React.CSSProperties = {
    backgroundColor: theme.colors["color-primary-900"],
  };
  const panelAppIcon: React.CSSProperties = {
    paddingLeft: 10,
    paddingRight: 5,
  };
  const me = useCurrentUser();
  const setMe = useSetCurrentUser();
  const setGroup = useSetCurrentGroup();
  const alert = useCustomAlert();
  const screen = useScreenSize();
  const history = useHistory();
  const [optionsVisible, setOptionsVisible] = useState(false);

  const onPanelRightPress = useCallback(
    (defined: boolean | null = null) => {
      if (defined !== null) {
        setOptionsVisible(defined);
        return;
      }
      setOptionsVisible(!optionsVisible);
    },
    [optionsVisible]
  );

  const logOut = () => {
    onPanelRightPress();
    console.log(TAG, Api.app);
    Api.app
      .logOut()
      .then(() => {
        setMe(new UserType("", null));
        setGroup(new GroupType("", null));
        alert.info("Sesion cerrada!");
        alert.info("Direccionado a login!");
        localStorage.clear();
        history.push("/login");
      })
      .catch(() => alert.error("Accion fallida"));
  };
  const listItem = useCallback((onPress: () => void, text: string) => {
    return (
      <div
        className="itemList"
        onClick={() => {
          onPanelRightPress(false);
          onPress();
        }}
      >
        <CText type="p" color={theme.colors["color-basic-100"]}>
          {text}
        </CText>
      </div>
    );
  }, []);
  return (
    <Panel height={35} level="5" className="HomeBarTop">
      <div className="panelLeft">
        <CText type="h5" color={theme.colors["color-primary-600"]}>
          {title}
        </CText>
      </div>
      <Panel
        style={panelRightStyles}
        height={35}
        paddingX={10}
        className="panelRight"
      >
        <div className="panelRight" onClick={() => onPanelRightPress()}>
          <CText type="h5" color={theme.colors["color-primary-100"]}>
            {utils.stringWithLimit(me.name, 12)}
          </CText>
          <ProfileIcon width={25} color={theme.colors["color-primary-100"]} />
          {screen.minSize("xs") && screen.maxSize("sm") && (
            <Panel style={panelAppIcon}>
              <AppIconWhite width={25} />
            </Panel>
          )}
        </div>
        {optionsVisible && (
          <Panel style={panelRightStyles} className="panelRightToggle">
            {listItem(() => onSelect("search"), "Usuarios")}

            {listItem(() => onSelect("selectGroup"), "Cambiar grupo")}

            {listItem(() => logOut(), "Cerrar sesion")}
          </Panel>
        )}
      </Panel>
    </Panel>
  );
};
export default HomeBarTop;
