import React from "react";
import ContactContainer from "../ContactContainer/ContactContainer";
import MapLocationContainer from "../MapLocationContainer/MapLocationContainer";
import HomeBody from "./HomeBody";
import HomeTopBar from "./HomeTopBar";
const TAG = "HOME CONTAINER";
type HomeContainerProps = {
  initialPage?: "start" | "contact" | "map";
};
const HomeContainer: React.FC<HomeContainerProps> = ({
  initialPage = "start",
}) => {
  console.log(TAG, "render");
  return (
    <div className="HomeContainer">
      <HomeTopBar />
      <div>
        {initialPage === "start" && <HomeBody />}
        {initialPage === "contact" && <ContactContainer />}
        {initialPage === "map" && <MapLocationContainer />}
      </div>
    </div>
  );
};
export default HomeContainer;
