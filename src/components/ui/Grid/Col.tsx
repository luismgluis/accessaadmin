import "./Grid.scss";
import React from "react";
import utils from "../../../libs/utils/utils";
const TAG = "CUSTOM Col";
interface ColProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  maxWidth?: number | undefined;
  flex?: number;
}
const Col: React.FC<ColProps> = ({ style, children, maxWidth, flex }) => {
  console.log(TAG);
  console.log(TAG, "render");
  const containerStyles = {
    ...style,
    maxWidth: maxWidth,
    flex: utils.isNum(flex) ? `${flex}` : undefined,
  };
  return (
    <div style={containerStyles} className="Col">
      {children}
    </div>
  );
};
export default Col;
