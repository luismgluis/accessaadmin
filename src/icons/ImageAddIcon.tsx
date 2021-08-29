import React from "react";
const TAG = "IMAGE ICON ADD";
type ImageAddIconProps = {
  width?: number;
  color?: string;
  color2?: string;
};
const ImageAddIcon: React.FC<ImageAddIconProps> = ({
  width = 50,
  color = "#d5d5d5",
}) => {
  console.log(TAG);
  return (
    <div className="ImageAddIcon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={width}
        enableBackground="new 0 0 512 512"
        viewBox="0 0 419.2 419.2"
      >
        <g xmlns="http://www.w3.org/2000/svg" fill={color}>
          <circle cx="158" cy="144.4" r="28.8" data-original="#000000"></circle>
          <path
            d="M394.4 250.4c-13.6-12.8-30.8-21.2-49.6-23.6V80.4c0-15.6-6.4-29.6-16.4-40C318 30 304 24 288.4 24h-232c-15.6 0-29.6 6.4-40 16.4C6 50.8 0 64.8 0 80.4v238.8c0 15.6 6.4 29.6 16.4 40 10.4 10.4 24.4 16.4 40 16.4h224.4c14.8 12 33.2 19.6 53.6 19.6 23.6 0 44.8-9.6 60-24.8 15.2-15.2 24.8-36.4 24.8-60s-9.6-44.8-24.8-60zM21.2 80.4c0-9.6 4-18.4 10.4-24.8 6.4-6.4 15.2-10.4 24.8-10.4h232c9.6 0 18.4 4 24.8 10.4 6.4 6.4 10.4 15.2 10.4 24.8v124.8l-59.2-58.8c-4-4-10.8-4.4-15.2 0L160 236l-60.4-60.8c-4-4-10.8-4.4-15.2 0l-63.2 64V80.4zM56 354.8v-.4c-9.6 0-18.4-4-24.8-10.4-6-6.4-10-15.2-10-24.8v-50L92.4 198l60.4 60.4c4 4 10.8 4 15.2 0l89.2-89.6 58.4 58.8-3.6 1.2c-1.6.4-3.2.8-5.2 1.6-1.6.4-3.2 1.2-4.8 1.6-1.2.4-2 .8-3.2 1.6-1.6.8-2.8 1.2-4 2l-6 3.6c-1.2.8-2 1.2-3.2 2-.8.4-1.2.8-2 1.2-3.6 2.4-6.8 5.2-9.6 8.4-15.2 15.2-24.8 36.4-24.8 60 0 6 .8 11.6 2 17.6.4 1.6.8 2.8 1.2 4.4 1.2 4 2.4 8 4 12v.4c1.6 3.2 3.2 6.8 5.2 9.6H56zm322.8.4c-11.6 11.6-27.2 18.4-44.8 18.4-16.8 0-32.4-6.8-43.6-17.6-1.6-1.6-3.2-3.6-4.8-5.2-1.2-1.2-2.4-2.8-3.6-4-1.6-2-2.8-4.4-4-6.8-.8-1.6-1.6-2.8-2.4-4.4-.8-2-1.6-4.4-2-6.8-.4-1.6-1.2-3.6-1.6-5.2-.8-4-1.2-8.4-1.2-12.8 0-17.6 7.2-33.2 18.4-44.8 11.6-11.6 27.2-18.4 44.8-18.4 17.6 0 33.2 7.2 44.8 18.4 11.6 11.2 18.4 27.2 18.4 44.8 0 17.2-7.2 32.8-18.4 44.4z"
            data-original="#000000"
          ></path>
          <path
            d="M368.8 299.6h-24.4v-24.4c0-6-4.8-10.8-10.8-10.8s-10.8 4.8-10.8 10.8v24.4h-24.4c-6 0-10.8 4.8-10.8 10.8s4.8 10.8 10.8 10.8h24.4v24.4c0 6 4.8 10.8 10.8 10.8s10.8-4.8 10.8-10.8v-24.4h24.4c6 0 10.8-4.8 10.8-10.8s-4.8-10.8-10.8-10.8z"
            data-original="#000000"
          ></path>
        </g>
      </svg>
    </div>
  );
};
export default ImageAddIcon;
