type AppIconSlimProps = {
  width?: number;
  color?: string;
  height?: number | null;
  withShadow?: boolean;
};
const AppIconSlim: React.FC<AppIconSlimProps> = ({
  width = 50,
  height = null,
  color = "#d5d5d5",
  withShadow = false,
}) => {
  if (height === null) height = width;
  const customStyles = {
    filter: withShadow ? `drop-shadow(1px 1px 1px color70` : "",
  };
  return (
    <div className="AppIconSlim">
      <svg
        style={customStyles}
        xmlns="http: //www.w3.org/2000/svg"
        width={width}
        height={width}
        viewBox="0 0 251.6 251.6"
      >
        <path fill="none" d="M0 0H251.6V251.6H0z" />
        <path
          d="M72.46 74.53q0 12.18 10.24 20.06a74.15 74.15 0 0024.9 12.26q14.64 4.31 32.32 9.56c11.78 3.5 22.77 6.71 33 9.71a46.66 46.66 0 0125.08 18.1c6.53 9 9.82 17.91 9.82 33.81a57.36 57.36 0 01-22.45 44.75q-22.46 17.35-62.58 17.35a176.39 176.39 0 01-76.44-17.2v-9.88a178.24 178.24 0 0034.85 12.33v-7.5a179.43 179.43 0 01-34.81-12.33v-11h1.6q33.12 18.47 75.47 18.47 55.74 0 55.74-36.94 0-18.08-27.13-26.59c-7.75-2.28-16.4-4.89-26-7.7s-19.22-5.68-28.88-8.54a134.52 134.52 0 01-26.48-10.83 53.16 53.16 0 01-19.43-18.15c-5-7.75-7.48-13-7.48-27.55s7.27-34 21.81-46.5 34.18-18.79 58.92-18.79 47.08 3.82 67 11.47v9.78a169.29 169.29 0 00-35.34-9.18V31a169.29 169.29 0 0135.34 9.18V50h-2.23q-29.9-12.09-57.45-12.1t-43.47 9.72q-15.91 9.71-15.92 26.91z"
          fill="#29323b"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
};
export default AppIconSlim;
