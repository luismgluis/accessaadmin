import "./StartLoading.scss";
import React, { useEffect, useMemo, useState } from "react";
import Panel from "./../Panel/Panel";
import styled, { keyframes } from "styled-components";
import { slideInRight, slideInLeft, zoomIn } from "react-animations";
import { useTheme } from "../../hooks/useTheme";
import { useScreenSize } from "../../hooks/windowResize";

const TAG = "START LOADING";

const AnimRight = keyframes`${slideInRight}`;
const AnimRightDiv = styled.div`
  animation: 1s ${AnimRight};
`;
const AnimLeft = keyframes`${slideInLeft}`;
const AnimLeftDiv = styled.div`
  animation: 1s ${AnimLeft};
`;

const AnimText = keyframes`${zoomIn}`;
const AnimTextH1 = styled.h1`
  animation: 1s ${AnimText};
`;
const AnimTextH5 = styled.h5`
  animation: 1s ${AnimText};
`;

type TriangleProps = {
  width: number;
  height: number;
  right?: boolean;
  bottom?: boolean;
  zIndex?: number;
  color?: string;
};
const Triangle: React.FC<TriangleProps> = ({
  width,
  height,
  zIndex = 0,
  right = false,
  bottom = false,
  color = "red",
}) => {
  console.log(TAG);
  const customStyles = useMemo(() => {
    const styles: any = {
      width: 0,
      height: 0,
      zIndex: zIndex,
      borderTop: undefined,
      borderRight: undefined,
      borderLeft: undefined,
      borderBottom: undefined,
      top: undefined,
      bottom: undefined,
      right: undefined,
    };
    if (right) {
      styles.right = 0;
      styles.borderTop = `${height}px solid ${color}`;
      styles.borderLeft = `${width}px solid transparent`;
    } else {
      styles.borderBottom = `${height}px solid ${color}`;
      styles.borderRight = `${width}px solid transparent`;
    }
    if (bottom) {
      styles.bottom = 0;
    } else {
      styles.top = 0;
    }
    return styles;
  }, [width, height, zIndex, right, bottom, color]);

  const triangleContainerStyles: React.CSSProperties = {
    width: width,
    height: height,
    right: customStyles.right,
    bottom: customStyles.bottom,
    top: customStyles.top,
    position: "absolute",
    zIndex: customStyles.zIndex,
    overflow: "hidden",
  };
  const [animateStart, setAnimateStart] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAnimateStart(true);
    }, 500);
  }, []);

  return (
    <div className="triangleContainer" style={triangleContainerStyles}>
      {animateStart && (
        <>
          {right && (
            <AnimRightDiv className="triangle" style={{ ...customStyles }} />
          )}
          {!right && (
            <AnimLeftDiv className="triangle" style={{ ...customStyles }} />
          )}
        </>
      )}
    </div>
  );
};

type StartLoadingProps = {
  onLoad: () => void;
};

const StartLoading: React.FC<StartLoadingProps> = ({ onLoad }) => {
  console.log(TAG);
  const theme = useTheme();
  const screen = useScreenSize();
  useEffect(() => {
    setTimeout(() => {
      onLoad();
    }, 1500);
  }, [onLoad]);
  return (
    <Panel width={screen.winX} height={screen.winY} overflow="hidden">
      <Triangle
        color={theme.colors["color-primary-500"]}
        width={screen.winX}
        height={100}
        right={true}
        bottom={false}
      />
      <Triangle
        zIndex={2}
        color={theme.colors["color-primary-700"]}
        width={screen.winX - 10}
        height={95}
        right={true}
        bottom={false}
      />

      <div style={{ height: screen.winY }} className="topContainer">
        <div className="container">
          <AnimTextH1 style={{ color: theme.colors["color-info-800"] }}>
            Hello
          </AnimTextH1>
          <AnimTextH5>Welcome to Stonelist</AnimTextH5>
        </div>
      </div>
      <Triangle
        zIndex={2}
        color={theme.colors["color-primary-700"]}
        width={screen.winX - 10}
        height={95}
        right={false}
        bottom={true}
      />
      <Triangle
        color={theme.colors["color-primary-500"]}
        width={screen.winX}
        height={100}
        right={false}
        bottom={true}
      />
    </Panel>
  );
};
export default StartLoading;
