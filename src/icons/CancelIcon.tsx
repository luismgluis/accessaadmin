import React from "react";
const TAG = "";
type CancelIconProps = {
  width?: number;
  color?: string;
  color2?: string;
};
const CancelIcon: React.FC<CancelIconProps> = ({
  width = 50,
  color = "#d5d5d5",
  color2 = "#212121",
}) => {
  console.log(TAG);
  return (
    <div className="CancelIcon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={width}
        enableBackground="new 0 0 512 512"
        viewBox="0 0 365.717 365"
      >
        <g xmlns="http://www.w3.org/2000/svg" fill={color}>
          <path
            d="M356.34 296.348L69.727 9.734c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.816c-12.5 12.504-12.5 32.77 0 45.25L295.988 356.68c12.504 12.5 32.77 12.5 45.25 0l15.082-15.082c12.524-12.48 12.524-32.75.02-45.25zm0 0"
            data-original={color}
          ></path>
          <path
            d="M295.988 9.734L9.375 296.348c-12.5 12.5-12.5 32.77 0 45.25l15.082 15.082c12.504 12.5 32.77 12.5 45.25 0L356.34 70.086c12.504-12.5 12.504-32.766 0-45.246L341.258 9.758c-12.5-12.524-32.766-12.524-45.27-.024zm0 0"
            data-original={color}
          ></path>
        </g>
      </svg>
    </div>
  );
};
export default CancelIcon;
