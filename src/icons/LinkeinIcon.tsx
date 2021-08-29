import React from "react";
const TAG = "";
type LinkedinProps = {
  width?: number;
  color?: string;
};
const Linkedin: React.FC<LinkedinProps> = ({
  width = 50,
  color = "#d5d5d5",
}) => {
  console.log(TAG);
  return (
    <div className="Linkedin">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={width}
        enableBackground="new 0 0 512 512"
        viewBox="0 0 512 512"
      >
        <g xmlns="http://www.w3.org/2000/svg" fill={color}>
          <path d="M0 160H114.496V512H0z" data-original="#1976d2"></path>
          <path
            d="M426.368 164.128c-1.216-.384-2.368-.8-3.648-1.152a74.218 74.218 0 00-4.64-.896c-6.08-1.216-12.736-2.08-20.544-2.08-66.752 0-109.088 48.544-123.04 67.296V160H160v352h114.496V320s86.528-120.512 123.04-32v224H512V274.464c0-53.184-36.448-97.504-85.632-110.336z"
            data-original="#1976d2"
          ></path>
          <circle cx="56" cy="56" r="56" data-original="#1976d2"></circle>
        </g>
      </svg>
    </div>
  );
};
export default Linkedin;
