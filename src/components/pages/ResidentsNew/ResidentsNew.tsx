import "./ResidentsNew.scss";
import React from "react";
const TAG = "RESIDENTS SEARCH";
type ResidentsNewProps = {
  prop1?: any;
};
const ResidentsNew: React.FC<ResidentsNewProps> = ({ prop1 }) => {
  console.log(TAG, "render");
  return <div className="ResidentsNew"></div>;
};
export default ResidentsNew;
