import React from "react";
const TAG = "HOME BODY";
type HomeBodyProps = {
  prop1?: any;
};
const HomeBody: React.FC<HomeBodyProps> = ({ prop1 }) => {
  console.log(TAG, "render");
  return <div className="HomeBody">home body</div>;
};
export default HomeBody;
