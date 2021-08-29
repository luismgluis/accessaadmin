import "./CButtonImage.scss";
import React, { useCallback, useMemo, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

const TAG = "CUSTOM BUTTON";
interface CButtonImageProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  ghost?: boolean;
  icon: JSX.Element;
  onPress?: () => void;
  width?: string | number;
  height?: string | number;
  marginX?: string | number;
  padding?: number;
  background?: string;
  hoverBackground?: string;
}
const CButtonImage: React.FC<CButtonImageProps> = ({
  ghost = false,
  onPress = () => null,
  icon,
  width = "",
  height = "",
  marginX = "",
  padding = 0,
  background = "",
  hoverBackground = "",
  className,
}) => {
  const theme = useTheme();
  const [customBackground, setBackground] = useState(
    background !== "" ? background : theme.colors["color-info-500"]
  );

  const classButton = useMemo(() => {
    if (!ghost) {
      return "buttonImage";
    }
    return "buttonImageGhost";
  }, [ghost]);

  const containerStyles: React.CSSProperties = {
    padding: padding,
    paddingLeft: marginX ? marginX : undefined,
    paddingRight: marginX ? marginX : undefined,
  };

  const subContainerStyles: React.CSSProperties = {
    marginLeft: marginX ? marginX : undefined,
    marginRight: marginX ? marginX : undefined,
  };

  const buttonStyles: React.CSSProperties = {
    cursor: "pointer",
    width: width !== "" ? width : undefined,
    height: height !== "" ? height : undefined,
    padding: "10px",
    background: !ghost ? customBackground : undefined,
  };

  const onHover = useCallback(() => {
    setBackground(
      hoverBackground !== "" ? hoverBackground : theme.colors["color-info-400"]
    );
  }, [hoverBackground, theme]);
  const onLeave = useCallback(() => {
    setBackground(
      background !== "" ? background : theme.colors["color-info-500"]
    );
  }, [background, theme]);

  return (
    <div className="CButtonImage" style={containerStyles}>
      <button
        className={className ? classButton + " " + className : classButton}
        style={buttonStyles}
        onMouseEnter={() => onHover()}
        onMouseLeave={() => onLeave()}
        onClick={() => onPress()}
      >
        <div style={subContainerStyles}>{icon}</div>
      </button>
    </div>
  );
};
export default CButtonImage;
