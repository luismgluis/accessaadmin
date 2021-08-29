import React from "react";
import { SpinnerCircular } from "spinners-react";
import { useTheme } from "../../hooks/useTheme";
const TAG = "LOADING PANEL";
type LoadingPanelProps = {
  prop1?: any;
};
const LoadingPanel: React.FC<LoadingPanelProps> = ({ prop1 }) => {
  console.log(TAG, "render");
  const theme = useTheme();
  return (
    <div className="LoadingPanel">
      <SpinnerCircular
        size={50}
        thickness={100}
        speed={100}
        color={theme.colors["color-primary-600"]}
        secondaryColor={theme.colors["color-bg-500"]}
      />
    </div>
  );
};
export default LoadingPanel;
