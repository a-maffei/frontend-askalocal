import React from "react";
import local1 from "./pics/local1.jpg";
import local2 from "./pics/local2.jpg";
import local3 from "./pics/local3.jpeg";
import local4 from "./pics/local4.jpeg";
import local5 from "./pics/local5.jpeg";

import "./ImageSlide.css";
const ImageSlide = ({ posts }) => {
  const slicedPosts = posts.slice(0, 5);
  return (
    <div className="carousel" id="carousel">
      {/* <img alt="First slide" src={slicedPosts[0]?.pic} /> */}
      {/* {slicedPosts
        ? slicedPosts.map((local, i) => {
            <div className="carousel-item" key={i}>
              <img alt="First slide" src={local.pic} />
            </div>;
          })
        : ""} */}

      <div className="carousel-item">
        <div
          className="single-img-slide"
          style={{
            backgroundImage: `url(${local1}`,
            backgroundSize: "cover",
          }}
        ></div>
        <p className="imgText">
          Elena, <b>Rome</b>
        </p>
      </div>
      <div className="carousel-item">
        <div
          className="single-img-slide"
          style={{
            backgroundImage: `url(${local2}`,
            backgroundSize: "cover",
          }}
        ></div>
        <p className="imgText">
          Sara, <b>Barcelona</b>
        </p>
      </div>
      <div className="carousel-item">
        <div
          className="single-img-slide"
          style={{
            backgroundImage: `url(${local3}`,
            backgroundSize: "cover",
          }}
        ></div>
        <p className="imgText">
          Daniel, <b>Berlin</b>
        </p>
      </div>
      <div className="carousel-item">
        <div
          className="single-img-slide"
          style={{
            backgroundImage: `url(${local4}`,
            backgroundSize: "cover",
          }}
        ></div>{" "}
        <p className="imgText">
          Anne, <b>Vienna</b>
        </p>
      </div>
      <div className="carousel-item">
        <div
          className="single-img-slide"
          style={{
            backgroundImage: `url(${local5}`,
            backgroundSize: "cover",
          }}
        ></div>{" "}
        <p className="imgText">
          Charles, <b>Paris</b>
        </p>
      </div>
    </div>
  );
};

export default ImageSlide;
