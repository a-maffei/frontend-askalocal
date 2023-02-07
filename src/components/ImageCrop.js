import { useState, useCallback, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./ImageCrop.css";

const ImageCrop = () => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const croppedImgRef = useRef();

  const handleOnLoad = useCallback((img) => {
    croppedImgRef.current = img;
  }, []);

  const handleImage = (event) => {
    const { files } = event.target;

    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
    // setSrc(URL.createObjectURL(event.target.files[0]));
    // setImage(URL.createObjectURL(event.target.files[0]));
    // console.log(event.target.files[0]);
  };

  // const selectImage = (file) => {
  //   setSrc(URL.createObjectURL(file));
  //   setImage(URL.createObjectURL(file));
  // };

  // function onImageLoad(e) {
  //   const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

  //   const crop = centerCrop(
  //       1 / 1,
  //       width,
  //       height
  //     ),
  //     width,
  //     height
  //   ;

  //   setCrop(crop);
  // }

  const cropImageNow = async () => {
    try {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      // const pixelRatio = window.devicePixelRatio;
      // canvas.width = crop.width * pixelRatio;
      // canvas.height = crop.height * pixelRatio;
      // ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      // ctx.imageSmoothingQuality = "high";
      console.log(image);
      ctx.drawImage(
        image,
        100,
        100
        // crop.x * scaleX,
        // crop.y * scaleY,
        // crop.width * scaleX,
        // crop.height * scaleY,
        // 0,
        // 0,
        // crop.width,
        // crop.height
      );

      // Converting to base64
      const base64Image = canvas.toDataURL("image/jpeg", 1);
      setResult(base64Image);
      console.log(result);
    } catch (e) {
      console.log("crop the image", e);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(result);
  };

  return (
    <div className="topabstand">
      {/* <div className="App">
        <center>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              selectImage(e.target.files[0]);
            }}
          />
          <br />
          <br />
          <div>
            {src && (
              <div>
                
                <ReactCrop
                  aspect={1 / 1}
                  crop={crop}
                  style={{ maxWidth: "50vw", maxHeight: "30em" }}
                  onChange={(c) => setCrop(c)}
                >
                  <img src={src} />
                </ReactCrop>
                <br />
                <button onClick={cropImageNow}>Crop</button>
                <br />
                <br />
              </div>
            )}
          </div>
          <div className="front">{<img src={output} />}</div>
        </center>
      </div> */}
      <form onSubmit={handleSubmit}>
        <center>
          <label>Select Image you want to crop</label>
          <div>
            <input type="file" accept="image/*" onChange={handleImage} />
          </div>
          <div>
            {src && (
              <div>
                <ReactCrop
                  style={{ maxWidth: "50%" }}
                  src={src}
                  onComplete={(c) => setCompletedCrop(c)}
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onImageLoaded={handleOnLoad}
                />
                <button className="cropButton" onClick={cropImageNow}>
                  crop
                </button>
              </div>
            )}
            {result && (
              <div>
                <img src={result} alt="cropped image" />
              </div>
            )}
          </div>

          <button variant="primary" type="submit">
            Submit
          </button>
        </center>
      </form>
    </div>
  );
};

export default ImageCrop;
