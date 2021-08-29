import "./HomeBar.scss";
import React, { useState } from "react";
import { useTheme } from "../../hooks/useTheme";

const TAG = "HOME ITEM BOTTOM";
type HomeItemBottomProps = {
  icon: React.FC<any>;
  text?: string;
  selected?: boolean;
  expanded?: boolean;
  description?: string;
  onPress?: () => void;
};
const HomeItemBottom: React.FC<HomeItemBottomProps> = ({
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

  const containerStyles: React.CSSProperties = {
    backgroundColor:
      hover || selected ? theme.colors["color-primary-600"] : undefined,
  };
  const subContainerStyles: React.CSSProperties = {
    borderTopStyle: selected ? "solid" : undefined,
    borderTopColor: selected ? theme.colors["color-primary-600"] : undefined,
  };
  const customIconColor =
    theme.colorsx[`color-primary-${!(hover || selected) ? 600 : 200}`];

  const customPress = () => {
    setHover(false);
    onPress();
  };
  console.log(TAG, "render");
  return (
    <div
      className="HomeItemBottom"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => customPress()}
      style={containerStyles}
    >
      <div className="subContainer" style={subContainerStyles}>
        <Icon color={customIconColor} width={30} />
      </div>
    </div>
  );
};
export default HomeItemBottom;
