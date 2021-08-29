import React from "react";
const TAG = "CONTACT CONTAINER";
type ContactContainerProps = {
  prop1?: any;
};
const ContactContainer: React.FC<ContactContainerProps> = ({ prop1 }) => {
  console.log(TAG, "render");
  return <div className="ContactContainer">CONTACT CONTAINER</div>;
};
export default ContactContainer;
