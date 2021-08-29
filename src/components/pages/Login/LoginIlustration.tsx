import "./Login.scss";
import React from "react";
import DesktopPersonIcon from "../../../icons/DesktopPersonIcon";
import { useTheme } from "../../hooks/useTheme";

const TAG = "LOGIN ILUSTRATION";
type LoginIlustrationProps = {
  height: number;
};

const LoginIlustration: React.FC<LoginIlustrationProps> = ({ height }) => {
  console.log(TAG);
  const theme = useTheme();

  return (
    <div style={{ height: height }} className="LoginIlustration">
      <div
        className="loginIlustrationPanel1"
        style={{
          backgroundColor: theme.colors["color-info-100"],
          height: height * 0.9,
        }}
      >
        <h1 style={{ color: theme.colors["color-info-700"] }}>Welcome</h1>
      </div>
      <div
        className="loginIlustrationPanel2"
        style={{
          backgroundColor: theme.colors["color-info-500"],
          height: height * 0.1,
        }}
      ></div>
      <div className="loginIlustrationPanel3">
        <DesktopPersonIcon />
      </div>
    </div>
  );
};
export default LoginIlustration;
