import React from "react";
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
        <img alt="First slide" src={slicedPosts[0].pic} />
        <p className="imgText">
          {slicedPosts[0].firstname} <b>{slicedPosts[0].city}</b>
        </p>
      </div>
      <div className="carousel-item">
        <img alt="Second slide" src={slicedPosts[1].pic} />
        <p className="imgText">
          {slicedPosts[1].firstname} <b>{slicedPosts[0].city}</b>
        </p>
      </div>
      <div className="carousel-item">
        <img alt="Third slide" src={slicedPosts[2].pic} />
        <p className="imgText">
          {slicedPosts[2].firstname} <b>{slicedPosts[0].city}</b>
        </p>
      </div>
      <div className="carousel-item">
        <img alt="Fourth slide" src={slicedPosts[3].pic} />
        <p className="imgText">
          {slicedPosts[3].firstname} <b>{slicedPosts[0].city}</b>
        </p>
      </div>
      <div className="carousel-item">
        <img alt="Fourth slide" src={slicedPosts[4].pic} />
        <p className="imgText">
          {slicedPosts[4].firstname} <b>{slicedPosts[0].city}</b>
        </p>
      </div>
    </div>
  );
};

export default ImageSlide;
