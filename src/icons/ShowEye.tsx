type ShowEyeProps = {
  width?: number;
  color?: string;
  height?: number | null;
  withShadow?: boolean;
};
const ShowEye: React.FC<ShowEyeProps> = ({
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
    <div className="ShowEye">
      <svg
        style={customStyles}
        xmlns="http: //www.w3.org/2000/svg"
        width={width}
        height={width}
        viewBox="0 0 511.999 511.999"
      >
        <path
          d="M508.745 246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818 239.784 3.249 246.035a16.896 16.896 0 000 19.923c4.569 6.257 113.557 153.206 252.748 153.206s248.174-146.95 252.748-153.201a16.875 16.875 0 000-19.922zM255.997 385.406c-102.529 0-191.33-97.533-217.617-129.418 26.253-31.913 114.868-129.395 217.617-129.395 102.524 0 191.319 97.516 217.617 129.418-26.253 31.912-114.868 129.395-217.617 129.395z"
          fill={color}
          data-original="#000000"
          xmlns="http://www.w3.org/2000/svg"
        />
        <path
          d="M255.997 154.725c-55.842 0-101.275 45.433-101.275 101.275s45.433 101.275 101.275 101.275S357.272 311.842 357.272 256s-45.433-101.275-101.275-101.275zm0 168.791c-37.23 0-67.516-30.287-67.516-67.516s30.287-67.516 67.516-67.516 67.516 30.287 67.516 67.516-30.286 67.516-67.516 67.516z"
          fill={color}
          data-original="#000000"
          xmlns="http://www.w3.org/2000/svg"
        />
      </svg>
    </div>
  );
};
export default ShowEye;
