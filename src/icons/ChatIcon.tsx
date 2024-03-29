type ChatIconProps = {
  width?: number;
  color?: string;
  height?: number | null;
  withShadow?: boolean;
};
const ChatIcon: React.FC<ChatIconProps> = ({
  width = 50,
  height = null,
  color = "#d5d5d5",
  withShadow = true,
}) => {
  if (height === null) height = width;
  const customStyles = {
    filter: withShadow ? `drop-shadow(1px 1px 1px ${color}70` : "",
  };
  return (
    <div className="ChatIcon">
      <svg
        style={customStyles}
        xmlns="http: //www.w3.org/2000/svg"
        width={width}
        height={width}
        enableBackground="new 0 0 512 512"
        viewBox="0 0 512 512"
      >
        <g fill={color} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M432 0H80C35.817 0 0 35.817 0 80v256c0 44.183 35.817 80 80 80h313.44l91.2 91.36A15.999 15.999 0 00496 512c8.837 0 16-7.163 16-16V80c0-44.183-35.817-80-80-80zm48 457.44l-68.64-68.8A15.997 15.997 0 00400 384H80c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v377.44z"
            data-original="#000000"
          />
          <circle cx={256} cy={208} r={32} data-original="#000000" />
          <circle cx={368} cy={208} r={32} data-original="#000000" />
          <circle cx={144} cy={208} r={32} data-original="#000000" />
        </g>
      </svg>
    </div>
  );
};
export default ChatIcon;
