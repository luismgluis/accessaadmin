import React from "react";
import ContactContainer from "../../containers/ContactContainer/ContactContainer";
const TAG = "CONTACT";
type ContactProps = {
  prop1?: any;
};
const Contact: React.FC<ContactProps> = ({ prop1 }) => {
  console.log(TAG, "render");
  return (
    <div className="Contact">
      <ContactContainer />
    </div>
  );
};
export default Contact;
