type AddIconProps = {
  width?: number;
  color?: string;
};
const TAG = "";
const AddIcon: React.FC<AddIconProps> = ({ width = 50, color = "#d5d5d5" }) => {
  console.log(TAG);
  return (
    <div className="AddIcon">
      <svg
        style={{ filter: `drop-shadow(1px 1px 1px ${color}70` }}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={width}
        enableBackground="new 0 0 512 512"
        viewBox="0 0 512 512"
      >
        <path
          xmlns="http://www.w3.org/2000/svg"
          fill={color}
          d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM256 472c-119.102 0-216-96.898-216-216S136.898 40 256 40s216 96.898 216 216-96.898 216-216 216zm20-236.02h90v40h-90v90h-40v-90h-90v-40h90v-90h40zm0 0"
          data-original="#000000"
        ></path>
      </svg>
    </div>
  );
};
export default AddIcon;
