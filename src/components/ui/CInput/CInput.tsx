import "./CInput.scss";
import React, { useMemo, useRef, useState } from "react";
import utils from "../../../libs/utils/utils";
import { useTheme } from "../../hooks/useTheme";
import Panel from "../Panel/Panel";
import ShowEye from "../../../icons/ShowEye";
import HideEye from "../../../icons/HideEye";
import CButton from "../CButton/CButton";
import CButtonImage from "../CButtonImage/CButtonImage";

const TAG = "CUSTOM INPUT";

interface CInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeHolder?: string;
  marginX?: number;
  marginY?: number;
  windth?: number | string;
  type?: "password" | "date" | undefined;
  borderColor?: string;
  labelColor?: string;
  onUpdate?: (newVal: string) => void;
}
const CInput: React.FC<CInputProps> = ({
  label = "",
  placeHolder = "",
  onChange = () => null,
  value,
  type,
  name,
  marginY = 0,
  marginX = 0,
  width = "",
  borderColor = "",
  labelColor = "",
  defaultValue,
  autoComplete,
  onUpdate = (newVal: string) => null,
}) => {
  console.log(TAG);
  const [idInput] = useState(utils.generateKey("idInput"));
  const theme = useTheme();
  const getColor = (num: string | number) => {
    return theme.colorsx[`color-primary-${num}`];
  };
  const containerStyles = useMemo(() => {
    return {
      paddingTop: marginY,
      paddingBottom: marginY,
      paddingLeft: marginX,
      paddingRight: marginX,
      width: width !== "" ? width : undefined,
    };
  }, [marginX, marginY, width]);

  const inputStyles: React.CSSProperties = {
    backgroundColor: theme.colors["color-basic-400"],
    borderColor: borderColor || getColor(800),
    boxShadow: `0px 5px 7px -1px ${getColor(700)}40`,
    borderLeftColor: borderColor || getColor(800),
    borderLeftStyle: label ? "solid" : "none",
    paddingTop: label ? 25 : 5,
  };

  const labelStyles: React.CSSProperties = {
    backgroundColor: label ? getColor(800) : undefined,
    color: label ? getColor(100) : undefined,
  };

  const customChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    onUpdate(e.target.value);
  };
  const [showPass, setShowPass] = useState(true);
  const customType = useMemo(() => {
    if (type === "password" && showPass) {
      return "password";
    }
    if (type === "password" && !showPass) {
      return "text";
    }
    if (typeof type !== "undefined") return type;
  }, [type, showPass]);
  return (
    <div className="CInput" style={containerStyles}>
      <div className="CInputContainer" style={inputStyles}>
        {label !== "" && <label style={labelStyles}>{label}</label>}
        <Panel flex flexDirection="row">
          <input
            id={idInput}
            type={customType}
            name={name}
            value={value}
            autoComplete={autoComplete}
            defaultValue={defaultValue}
            onChange={(e) => customChange(e)}
            placeholder={placeHolder}
            style={{ color: getColor(900) }}
          />
          {type === "password" && (
            <Panel paddingX={5}>
              <div
                onClick={() => {
                  setShowPass(!showPass);
                }}
              >
                {!showPass && (
                  <ShowEye
                    width={30}
                    color={theme.colors["color-primary-600"]}
                  />
                )}
                {showPass && (
                  <HideEye
                    width={30}
                    color={theme.colors["color-primary-600"]}
                  />
                )}
              </div>
            </Panel>
          )}
        </Panel>
      </div>
    </div>
  );
};
export default CInput;
