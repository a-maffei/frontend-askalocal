import React from "react";
import local1 from "./pics/local1.jpg";
import local2 from "./pics/local2.jpg";
import local3 from "./pics/local3.jpg";
import local4 from "./pics/local4.jpg";
import local5 from "./pics/local5.jpg";
import local6 from "./pics/local6.jpg";
import local7 from "./pics/local7.jpg";

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
          id="profile-pic-cont"
          style={{
            backgroundImage: `url(${local1}`,
            backgroundSize: "cover",
          }}
        ></div>
        <p className="imgText">
          {slicedPosts[0].firstname} <b>{slicedPosts[0].city}</b>
        </p>
      </div>
      <div className="carousel-item">
        <img alt="Second slide" src={local2} />
        <p className="imgText">
          {slicedPosts[1].firstname} <b>{slicedPosts[0].city}</b>
        </p>
      </div>
      <div className="carousel-item">
        <img alt="Third slide" src={local3} />
        <p className="imgText">
          {slicedPosts[2].firstname} <b>{slicedPosts[0].city}</b>
        </p>
      </div>
      <div className="carousel-item">
        <img alt="Fourth slide" src={local4} />
        <p className="imgText">
          {slicedPosts[3].firstname} <b>{slicedPosts[0].city}</b>
        </p>
      </div>
      <div className="carousel-item">
        <img alt="Fourth slide" src={local5} />
        <p className="imgText">
          {slicedPosts[4].firstname} <b>{slicedPosts[0].city}</b>
        </p>
      </div>
    </div>
  );
};

export default ImageSlide;
