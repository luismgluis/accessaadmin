import React from "react";
import { Link } from "react-router-dom";
import AppIcon from "../../../icons/AppIcon/AppIcon";
import AppIconSlim from "../../../icons/AppIcon/AppIconSlim";
import { useScreenSize } from "../../hooks/windowResize";
import Panel from "../../ui/Panel/Panel";
const TAG = "HOME TOP BAR";
type HomeTopBarProps = {
  prop1?: any;
};
const HomeTopBar: React.FC<HomeTopBarProps> = ({ prop1 }) => {
  console.log(TAG, "render");
  const screen = useScreenSize();
  return (
    <Panel level="5" flex={true} className="HomeTopBar">
      {screen.minSize("sm") && (
        <Panel paddingX={10}>
          <AppIcon width={120} height={50} />
        </Panel>
      )}
      {screen.maxSize("xs") && (
        <Panel paddingX={10} paddingY={5} height={50}>
          <AppIconSlim width={35} height={35} />
        </Panel>
      )}
      <Panel level="8" flex={12}>
        <Panel flex={true} flexDirection="row-reverse">
          <p>
            <Link to="/public">Public Page</Link>
          </p>
          <p>
            <Link to="/public">contacr</Link>
          </p>
        </Panel>
      </Panel>
    </Panel>
  );
  // return <div className="HomeTopBar">TOP BAR</div>;
};
export default HomeTopBar;
