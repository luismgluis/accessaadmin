import "./HomeBar.scss";
import React, { useState } from "react";
import Panel from "../Panel/Panel";

import { slideInLeft } from "react-animations";
import styled, { keyframes } from "styled-components";
import CText from "./../CText/CText";
import { useTheme } from "../../hooks/useTheme";

const AnimRight = keyframes`${slideInLeft}`;
const AnimRightDiv = styled.div`
  animation: 0.5s ${AnimRight};
`;

const TAG = "HOME BAR ITEM LEFT";
type HomeItemLeftProps = {
  icon: React.FC<any>;
  text?: string;
  selected?: boolean;
  expanded?: boolean;
  description?: string;
  onPress?: () => void;
};
const HomeItemLeft: React.FC<HomeItemLeftProps> = ({
  icon: Icon,
  text,
  selected = false,
  expanded = false,
  description = "",
  onPress = () => null,
}) => {
  console.log(TAG);
  const theme = useTheme();
  const [hover, setHover] = useState(false);

  const customTextStyles: React.CSSProperties = {
    color: theme.colorsx[`color-primary-${!hover ? 900 : 100}`],
  };
  const customIconColor = theme.colorsx[`color-primary-${!hover ? 600 : 200}`];

  const containerStyles: React.CSSProperties = {
    backgroundColor: hover ? theme.colorsx["color-primary-600"] : undefined,
    borderRightStyle: selected ? "solid" : undefined,
    borderRightColor: selected ? theme.colors["color-primary-900"] : undefined,
  };

  const customPress = () => {
    onPress();
    setHover(false);
  };

  return (
    <Panel className="HomeItemLeft">
      {hover && !expanded && description && (
        <div className="preview">
          <AnimRightDiv
            style={{ backgroundColor: theme.colorsx["color-primary-600"] }}
          >
            <CText
              type="h5"
              style={{ color: theme.colors["color-primary-100"] }}
            >
              {description}
            </CText>
          </AnimRightDiv>
        </div>
      )}
      <div
        className="itemContainer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => customPress()}
        style={containerStyles}
      >
        <Icon color={customIconColor} width={30} />
        {expanded && (
          <Panel className="panelText" width={105} flex={1}>
            <h5 style={customTextStyles}>{text}</h5>
          </Panel>
        )}
      </div>
    </Panel>
  );
};
export default HomeItemLeft;
