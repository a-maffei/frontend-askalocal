import React from "react";
import { useState } from "react";
import ImageCropComp from "./ImageCropComp";

const ImageCrop = ({ imgURL }) => {
  const [image, setImage] = useState(null);

  return (
    <div className="topabstand">
      <div>
        <input type="file" accept="image/*" onChange={(e) => setImage(e)} />
      </div>
      <ImageCropComp imgURL={image} />
    </div>
  );
};

export default ImageCrop;
