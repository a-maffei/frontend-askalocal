import React, { useEffect } from "react";
import img from "./pics/profile.png";
import "./PostDisplay.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import cat from "./categories.json";

const PostDisplay = ({ posts, category, size, link }) => {
  let keys = null;

  const [flag, setFlag] = useState(null);

  return (
    <div>
      <Link
        to={link === "all" ? `/categories` : `/categories/${category}`}
        className="categoryLinks"
      >
        <button className="signupLegend absolute categoryLink category-bttn">
          {link === "all" ? `Category Overview` : `${cat[category]}`}
        </button>
      </Link>
      <div className={size === "small" ? "postDisplay" : "postDisplayBig"}>
        {
          ((keys = Object.keys(posts)),
          console.log("hey", posts),
          keys?.map((element, i) =>
            posts[element].categories ? (
              <Link
                key={i}
                className="postDiv"
                to={`/local/${posts[element]._id}`}
              >
                {posts[element].pic ? (
                  <img src={posts[element].pic} className="cat-avatarSmall" />
                ) : (
                  <img src={img} className="cat-avatarSmall" />
                )}
                <div className="cat-nameCity">
                  <p className="">
                    <b>{posts[element].firstname}</b> in{" "}
                  </p>
                  <b>
                    {" "}
                    <p className="cat-label">{posts[element].city}</p>
                  </b>
                </div>
                <div className="cat-message">
                  <p>
                    "
                    {posts[element].categories[category].textfield.slice(0, 50)}
                    "
                  </p>
                </div>
                <div className="cat-price">
                  <p>
                    <b>{posts[element].categories[category].price} €</b>
                  </p>
                </div>
              </Link>
            ) : (
              []
            )
          ))
        }
      </div>
    </div>
  );
};

export default PostDisplay;

// ((keys = Object.keys(item)),
//               keys.map((element, index) => (
