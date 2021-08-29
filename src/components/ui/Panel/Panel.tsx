import React, { useMemo, useRef } from "react";
import utils from "../../../libs/utils/utils";
import { useTheme } from "../../hooks/useTheme";
import { useScreenSize } from "../../hooks/windowResize";
import "./Panel.scss";

const TAG = "PANEL";
type PanelProps = {
  ref?: any;
  level?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  children?: any;
  width?: number | string;
  height?: number;
  paddingX?: number | string;
  paddingY?: number | string;
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  totalHeight?: number | string | null;
  overflow?: "hidden" | "scroll" | string;
  style?: React.CSSProperties;
  verticalCenter?: boolean;
  horizontalCenter?: boolean;
  className?: string;
  flex?: boolean | number;
};
const Panel: React.FC<PanelProps> = ({
  ref,
  level = "0",
  children,
  width,
  height,
  paddingX = undefined,
  paddingY = undefined,
  flexDirection = undefined,
  style,
  overflow,
  flex = false,
  totalHeight = null,
  verticalCenter = false,
  horizontalCenter = false,
  className = "",
}) => {
  // const panelKey = useRef(utils.generateKey("panelKey"));

  const theme = useTheme();
  const screen = useScreenSize(totalHeight !== null);

  const customHeight = useMemo(() => {
    const h = screen.winY;
    let newHeight = 0;
    if (!isNaN(Number(totalHeight))) {
      newHeight = h - Number(totalHeight);
    } else if (`${totalHeight}`.includes("%")) {
      const percent = Number(`${totalHeight}`.replace("%", "")) / 100;
      newHeight = h * percent;
    } else if (`${totalHeight}`.includes("px")) {
      const total = Number(`${totalHeight}`.replace("px", ""));
      newHeight = total;
    }
    return newHeight;
  }, [totalHeight, screen]);

  const containerStyles: React.CSSProperties = {
    width: width,
    height: height || customHeight || undefined,
    overflow: overflow,
    display: flex === true ? "flex" : undefined,
    flex: utils.isNum(flex) ? `${flex}` : undefined,
    backgroundColor:
      level !== "0" ? theme.colorsx[`color-basic-${level}00`] : undefined,

    flexDirection: flexDirection,
    justifyContent: verticalCenter ? "center" : undefined,
    paddingTop: paddingY,
    paddingBottom: paddingY,
    paddingLeft: paddingX,
    paddingRight: paddingX,
    ...style,
  };
  if (verticalCenter) {
    containerStyles.display = "flex";
    containerStyles.justifyContent = "center";
    containerStyles.alignItems = "center";
  }

  if (!verticalCenter && !horizontalCenter) {
    return (
      <div
        ref={ref}
        className={`${className ? className + " " : ""}Panel`}
        style={containerStyles}
      >
        {children}
      </div>
    );
  }
  return (
    <div className="Panel" style={containerStyles}>
      {verticalCenter && (
        <div
          ref={ref}
          className={`${className ? className + " " : ""}panelContainer`}
        >
          {children}
        </div>
      )}
      {horizontalCenter && (
        <div ref={ref} className={`panelHorizontalCenter ${className}`}>
          {children}
        </div>
      )}
    </div>
  );
};
export default Panel;
