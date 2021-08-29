import "./AlertTemplate.scss";
import React, { useMemo } from "react";
import CButtonImage from "../CButtonImage/CButtonImage";
import Panel from "../Panel/Panel";
import CText from "../CText/CText";
import CancelIcon from "../../../icons/CancelIcon";
import { useTheme } from "../../hooks/useTheme";
import { useScreenSize } from "../../hooks/windowResize";
const TAG = "ALERT TEMPLATE";
type AlertTemplateProps = {
  style: any;
  options: any;
  message: any;
  close: any;
};
const AlertTemplate: React.FC<AlertTemplateProps> = ({
  style,
  options,
  message,
  close,
}) => {
  // console.log(TAG);
  const theme = useTheme();
  const data = useMemo(() => {
    const obj = JSON.parse(message);
    try {
      return {
        title: obj["title"],
        text: obj["text"],
      };
    } catch (error) {
      return {
        title: obj["title"],
        text: message,
      };
    }
  }, [message]);

  const customContainerStyles: React.CSSProperties = {
    boxShadow: `${theme.colors["color-primary-900"]}40 0px 5px 7px`,
    ...style,
  };
  const screen = useScreenSize(true);

  return (
    <div className="AlertTemplate" style={customContainerStyles}>
      <Panel
        level="5"
        flex
        flexDirection="row"
        width={screen.winX * 0.5}
        paddingY={5}
        paddingX={5}
      >
        <Panel width="100%" paddingY={10} className="left">
          <CText type="h5" color={theme.colors["color-primary-800"]}>
            {data.text}
          </CText>
          {data.title && <CText>{data.title}</CText>}
        </Panel>
        <div className="right">
          <CButtonImage
            background={theme.colors["color-basic-500"]}
            hoverBackground={theme.colors["color-primary-100"]}
            icon={
              <CancelIcon width={20} color={theme.colors["color-basic-800"]} />
            }
            onPress={close}
          />
        </div>
      </Panel>
      {/* <Panel>
        {options.type === "info" && "!"}
        {options.type === "success" && ":)"}
        {options.type === "error" && ":("}
      </Panel> */}
    </div>
  );
};
export default AlertTemplate;
