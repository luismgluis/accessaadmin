import "./CImage.scss";
import Lightbox from "./Lightbox";

import React, { useState } from "react";
const TAG = "CUSTOM IMAGE";
type imageType = {
  url: string;
  title: string;
};
type CImageProps = {
  src: string;
  title?: string;
  images?: imageType[];
  height?: number;
  width?: number;
  preview?: boolean;
};
const CImage: React.FC<CImageProps> = ({
  src,
  title,
  images,
  width,
  height,
  preview = false,
}) => {
  console.log(TAG, "render");
  const [active, setActive] = useState(false);
  return (
    <div className="CImage">
      <img
        src={src}
        alt={`imagen de ${title}`}
        height={height}
        width={width}
        onClick={(e) => setActive(!active)}
      />
      {preview && active && (
        <>
          {images && (
            <Lightbox
              onClose={() => setActive(!active)}
              images={images}
            ></Lightbox>
          )}
          {!images && (
            <Lightbox
              onClose={() => setActive(!active)}
              image={src}
              title={title}
            ></Lightbox>
          )}
        </>
      )}
    </div>
  );
};
export default CImage;
