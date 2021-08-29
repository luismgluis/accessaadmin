import "./CButton.scss";
import React from "react";

import CButtonImage from "../CButtonImage/CButtonImage";
import { useTheme } from "../../hooks/useTheme";
const TAG = "CUSTOM BUTTON";
interface CButtonProps {
  className?: string;
  text?: any;
  width?: number | string;
  onPress?: () => void;
  marginX?: number | string;
  fontColor?: string;
  background?: string;
  hoverBackground?: string;
  ghost?: boolean;
}
const CButton: React.FC<CButtonProps> = ({
  text,
  onPress = () => null,
  width = "100%",
  marginX,
  ghost,
  fontColor,
  background,
  hoverBackground,
  className,
}) => {
  console.log(TAG);
  const theme = useTheme();
  const textIcon = () => {
    return (
      <h5
        style={{
          color: fontColor ? fontColor : theme.colors["color-primary-900"],
        }}
      >
        {text}
      </h5>
    );
  };
  return (
    <CButtonImage
      className={className}
      onPress={() => onPress()}
      marginX={marginX}
      ghost={ghost}
      width={width}
      padding={5}
      background={background ? background : theme.colors[`color-primary-400`]}
      hoverBackground={
        hoverBackground ? hoverBackground : theme.colors[`color-primary-200`]
      }
      icon={textIcon()}
    ></CButtonImage>
  );
};
export default CButton;
