import React from "react";
import { useTheme } from "../../hooks/useTheme";
const TAG = "CUSTOM TEXT";

type CTextProps = {
  className?: string;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  paddingX?: number | undefined;
  paddingY?: number | undefined;
  children?: any;
  color?: string | undefined;
  style?: React.CSSProperties;
};
const CText: React.FC<CTextProps> = ({
  className,
  type,
  children,
  color = undefined,
  style,
  paddingX,
  paddingY,
}) => {
  const theme = useTheme();
  const customStyles: React.CSSProperties = {
    color: color ? color : theme.colors["color-primary-800"],
    paddingLeft: paddingX,
    paddingRight: paddingX,
    paddingTop: paddingY,
    paddingBottom: paddingY,
    ...style,
  };
  if (type === "h1")
    return (
      <h1 className={className} style={customStyles}>
        {children}
      </h1>
    );
  if (type === "h2")
    return (
      <h2 className={className} style={customStyles}>
        {children}
      </h2>
    );
  if (type === "h3")
    return (
      <h3 className={className} style={customStyles}>
        {children}
      </h3>
    );
  if (type === "h4")
    return (
      <h4 className={className} style={customStyles}>
        {children}
      </h4>
    );
  if (type === "h5")
    return (
      <h5 className={className} style={customStyles}>
        {children}
      </h5>
    );
  if (type === "h6")
    return (
      <h6 className={className} style={customStyles}>
        {children}
      </h6>
    );
  if (type === "p")
    return (
      <p className={className} style={customStyles}>
        {children}
      </p>
    );
  return <h5 style={customStyles}>{children}</h5>;
};
export default CText;
