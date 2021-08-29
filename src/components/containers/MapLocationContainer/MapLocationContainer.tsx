import React from "react";
const TAG = "MAP LOCATION CONTAINER";
type MapLocationContainerProps = {
  prop1?: any;
};
const MapLocationContainer: React.FC<MapLocationContainerProps> = ({
  prop1,
}) => {
  console.log(TAG, "render");
  return <div className="MapLocationContainer">MAP LOCATION CONTAINER</div>;
};
export default MapLocationContainer;
