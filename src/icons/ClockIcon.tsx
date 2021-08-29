type ClockIconProps = {
  width?: number;
  color?: string;
  height?: number | null;
  withShadow?: boolean;
};
const ClockIcon: React.FC<ClockIconProps> = ({
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
    <div className="ClockIcon">
      <svg
        style={customStyles}
        xmlns="http: //www.w3.org/2000/svg"
        width={width}
        height={width}
        enableBackground="new 0 0 512 512"
        viewBox="0 0 512 512"
      >
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M256 296c-22.09 0-40-17.91-40-40 0-14.805 8.047-27.719 20-34.637V100c0-11.047 8.953-20 20-20s20 8.953 20 20v121.363c11.953 6.918 20 19.832 20 34.637 0 3.582-.48 7.05-1.363 10.355l53.004 53.004c7.812 7.809 7.812 20.473 0 28.282A19.929 19.929 0 01333.5 353.5a19.922 19.922 0 01-14.14-5.86l-53.005-53A40.062 40.062 0 01256 296zM437.152 75.113C388.891 26.781 324.7.105 256.402 0h-.398C116.14 0 1.336 113.648.012 253.52c-.567 59.636 19.816 117.886 57.386 164.027.696.851.672 2.043-.027 2.742l-34.535 34.406c-9.61 9.61-12.461 23.942-7.262 36.508a33.466 33.466 0 0030.98 20.738l90.653.059h.035c13.29 0 25.781-5.176 35.18-14.574 9.41-9.406 14.586-21.91 14.578-35.215l-.05-90.664c-.016-13.613-8.157-25.77-20.74-30.973-12.565-5.199-26.898-2.347-36.507 7.262l-.156.156-7.844 8.024c-7.726 7.894-7.586 20.554.313 28.28 6.84 6.692 17.254 7.481 24.941 2.438l.043 75.5c0 3.52-1.79 5.84-2.86 6.907-1.066 1.07-3.382 2.859-6.898 2.859h-.008l-75.043-.05 23.438-23.348c15.285-15.286 16.48-39.497 2.785-56.313-31.691-38.918-48.883-88.066-48.406-138.39C41.128 135.878 137.984 40 256.004 40h.336C375.254 40.184 472 137.082 472 256c0 42.59-12.664 84.047-36.625 119.887-6.14 9.18-3.672 21.601 5.508 27.742 9.18 6.137 21.605 3.672 27.742-5.512C497 355.676 512 306.531 512 256c0-68.309-26.582-132.55-74.848-180.887zm-69.414 365.782C334.141 461.242 295.504 472 256 472c-11.047 0-20 8.953-20 20s8.953 20 20 20c46.812 0 92.617-12.758 132.46-36.895 9.45-5.722 12.47-18.02 6.747-27.468-5.727-9.446-18.023-12.465-27.469-6.742zm0 0"
          fill={color}
          data-original="#000000"
        />
      </svg>
    </div>
  );
};
export default ClockIcon;