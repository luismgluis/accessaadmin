import React from "react";

type TelegramIconProps = {
  width?: number;
  color?: string;
  color2?: string;
};
const TAG = "";
const TelegramIcon: React.FC<TelegramIconProps> = ({
  width = 50,
  color = "#d5d5d5",
  color2 = "#212121",
}) => {
  console.log(TAG);
  return (
    <div className="TelegramIcon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={width}
        enableBackground="new 0 0 512 512"
        viewBox="0 0 24 24"
      >
        <circle
          xmlns="http://www.w3.org/2000/svg"
          cx="12"
          cy="12"
          r="12"
          fill={color}
          data-original={color}
        ></circle>
        <path
          xmlns="http://www.w3.org/2000/svg"
          fill={color2}
          d="M5.491 11.74l11.57-4.461c.537-.194 1.006.131.832.943l.001-.001-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953z"
          data-original="#ffffff"
        ></path>
      </svg>
    </div>
  );
};
export default TelegramIcon;
