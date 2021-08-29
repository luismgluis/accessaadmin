import "./Grid.scss";
import React from "react";
import utils from "../../../libs/utils/utils";

const TAG = "CUSTOM ROW";
interface RowProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  height?: number;
  flex?: number;
}
const Row: React.FC<RowProps> = ({ style, children, height, flex }) => {
  console.log(TAG);
  console.log(TAG, "render");
  const customStyles: React.CSSProperties = {
    ...style,
    height: height,
    flex: utils.isNum(flex) ? `${flex}` : undefined,
  };
  return (
    <div style={customStyles} className="Row">
      {children}
    </div>
  );
};
export default Row;
