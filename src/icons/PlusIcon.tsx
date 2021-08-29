import React from "react";

type PlusIconProps = {
  width?: number;
  color?: string;
  color2?: string;
};
const TAG = "";
const PlusIcon: React.FC<PlusIconProps> = ({
  width = 50,
  color = "#d5d5d5",
  color2 = "#212121",
}) => {
  console.log(TAG);
  return (
    <div className="PlusIcon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={width}
        className="hovered-paths"
        enableBackground="new 0 0 512 512"
        viewBox="0 0 93.562 93.562"
      >
        <path
          xmlns="http://www.w3.org/2000/svg"
          fill={color}
          d="M87.952 41.17l-36.386.11V5.61A5.598 5.598 0 0045.956 0a5.598 5.598 0 00-5.61 5.61l.11 35.561H5.61A5.598 5.598 0 000 46.781a5.597 5.597 0 005.61 5.609h34.791v35.562a5.599 5.599 0 005.61 5.61 5.599 5.599 0 005.61-5.61V52.391h36.331a5.599 5.599 0 005.61-5.61 5.616 5.616 0 00-5.61-5.611z"
          className="hovered-path"
          data-original="#000000"
        ></path>
      </svg>
    </div>
  );
};
export default PlusIcon;
