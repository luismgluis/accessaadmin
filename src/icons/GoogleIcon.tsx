import React from "react";
const TAG = "";
type GoogleIconProps = {
  width?: number;
  color?: string;
};
const GoogleIcon: React.FC<GoogleIconProps> = ({
  width = 50,
  color = "#d5d5d5",
}) => {
  console.log(TAG);
  return (
    <div className="GoogleIcon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={width}
        enableBackground="new 0 0 512 512"
        viewBox="0 0 512 512"
      >
        <path
          xmlns="http://www.w3.org/2000/svg"
          fill={color}
          d="M113.597 193.064l-87.204-50.347C9.543 176.768.001 215.17 0 255.998c0 40.263 9.645 78.731 26.754 113.084l86.837-50.135c-8.565-19.286-13.418-40.558-13.417-62.949.001-22.39 4.857-43.655 13.423-62.934zM423.925 62.768C378.935 23.634 320.145-.043 255.823 0 167.822.059 89.276 44.985 43.127 113.824l87.275 50.39c28.381-38.714 74.04-64.041 125.601-64.04 37.587.001 72.042 13.437 98.954 35.701 6.588 5.449 16.218 4.95 22.263-1.095l47.531-47.531c6.854-6.854 6.487-18.121-.826-24.481zM510.247 226.38c-.997-8.475-8.122-14.89-16.653-14.89l-209.767-.011c-9.22 0-16.696 7.475-16.696 16.696v66.727c0 9.22 7.475 16.696 16.696 16.696h117.548c-10.827 28.179-29.633 52.403-53.575 70.013l49.928 86.478c50.256-34.056 88.467-85.547 105.297-146.331 9.15-33.049 10.797-65.007 7.222-95.378zM318.93 398.381c-19.255 8.578-40.511 13.444-62.927 13.446-51.619.001-97.252-25.327-125.613-64.026l-86.903 50.174C89.249 466.137 166.915 512 256.001 512c40.272 0 78.603-9.845 112.889-27.084l-49.96-86.535z"
          data-original="#000000"
        ></path>
      </svg>
    </div>
  );
};
export default GoogleIcon;