import "./Login.scss";
import React, { useMemo, useState } from "react";

import LoginForm from "./LoginForm";
import { useScreenSize } from "../../hooks/windowResize";
import Panel from "../../ui/Panel/Panel";
import { useTheme } from "../../hooks/useTheme";
import LoginRegister from "./LoginRegister";

const TAG = "LOGIN";
type LoginProps = {
  prop1?: any;
};
const Login: React.FC<LoginProps> = ({ prop1 }) => {
  console.log(TAG);
  console.log(TAG, "login load");
  const screen = useScreenSize(true);
  const theme = useTheme();
  const customContainerStyles: React.CSSProperties = {
    backgroundColor: theme.colors["color-basic-900"],
    padding: screen.maxSize("xs") ? 10 : "10%",
  };
  const subContainerWidth = useMemo(() => {
    if (screen.maxSize("xs")) {
      return screen.winX * 0.9;
    } else if (screen.minSize("md")) {
      return screen.winX * 0.5;
    }
    return screen.winX * 0.4;
  }, [screen]);
  console.log(TAG, "subContainerWidth", subContainerWidth);
  const [registerEnabled, setRegisterEnabled] = useState(false);

  return (
    <Panel totalHeight={1} flex className="Login" style={customContainerStyles}>
      <Panel className="loginContainer" totalHeight={1}>
        <Panel level="5" width={subContainerWidth} className="subContainer">
          {!registerEnabled && (
            <LoginForm onGoToNext={() => setRegisterEnabled(true)} />
          )}
          {registerEnabled && (
            <LoginRegister onGoToBack={() => setRegisterEnabled(false)} />
          )}
        </Panel>
      </Panel>
      <Panel totalHeight={1} className="animBack"></Panel>
    </Panel>
  );
};
export default Login;
