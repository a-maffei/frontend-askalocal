import React from "react";
import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./ImageCrop.css";

const ImageCrop = ({ imgURL }) => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 9 });
  const [croppedImageUrl, setCroppedImageUrl] = useState("");

  const makeClientCrop = async (crop) => {
    if ((image, crop.width && crop.height)) {
      const croppedImg = await getCroppedImg(image, crop, "newFile.jpeg");
      setCroppedImageUrl(croppedImg);
    }
  };

  const getCroppedImg = (sourceImage, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      sourceImage,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    try {
      return new Promise((resolve) => {
        canvas.toBlob((file) => {
          resolve(URL.createObjectURL(file));
        }, "image/jpeg");
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <div className="topabstand">
      <ReactCrop
        src={imgURL}
        crop={crop}
        ruleOfThirds
        onImageLoaded={(img) => {
          console.log(img);
          setImage(img);
        }}
        onComplete={(crop) =>
          image ? makeClientCrop(crop) : console.log("wait")
        }
        onChange={(cropData) => setCrop(cropData)}
      />
    </div>
  );
};

export default ImageCrop;
