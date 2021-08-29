type SendIconProps = {
  width?: number;
  color?: string;
  height?: number | null;
  withShadow?: boolean;
};
const SendIcon: React.FC<SendIconProps> = ({
  width = 50,
  height = null,
  color = "#d5d5d5",
  withShadow = false,
}) => {
  if (height === null) height = width;
  const customStyles = {
    filter: withShadow ? `drop-shadow(1px 1px 1px ${color}70` : "",
  };
  return (
    <div className="SendIcon">
      <svg
        style={customStyles}
        xmlns="http: //www.w3.org/2000/svg"
        width={width}
        height={width}
        enableBackground="new 0 0 512 512"
        viewBox="0 0 448.011 448.011"
      >
        <path
          d="M438.731 209.463l-416-192c-6.624-3.008-14.528-1.216-19.136 4.48a15.911 15.911 0 00-.384 19.648l136.8 182.4-136.8 182.4c-4.416 5.856-4.256 13.984.352 19.648 3.104 3.872 7.744 5.952 12.448 5.952 2.272 0 4.544-.48 6.688-1.472l416-192c5.696-2.624 9.312-8.288 9.312-14.528s-3.616-11.904-9.28-14.528z"
          fill={color}
          data-original="#000000"
          xmlns="http://www.w3.org/2000/svg"
        />
      </svg>
    </div>
  );
};
export default SendIcon;
