import React from "react";
import img from "./pics/profile.png";
import "./PostDisplay.css";
import { Link } from "react-router-dom";
import cat from "./categories.json";

const PostDisplay = ({ posts, category, size, link, input }) => {
  let keys = null;
  console.log("input", input);

  // input.length > 0 &&
  // posts[element].categories[category].textfield.contains(input) ?

  return (
    <div>
      <Link
        to={link === "all" ? `/categories` : `/categories/${category}`}
        className="categoryLinks"
      >
        <h1 className="signupLegend absolute categoryLink">
          {link === "all" ? `Category Overview` : `${cat[category]}`}
        </h1>
      </Link>
      <div className={size === "small" ? "postDisplay" : "postDisplayBig"}>
        {
          ((keys = Object.keys(posts)),
          console.log("hey", posts),
          keys?.map((element, i) =>
            posts[element].categories &&
            (input.length < 1 ||
              posts[element].categories[category].textfield
                .toLowerCase()
                .includes(input)) ? (
              <Link
                key={i}
                className="postDiv"
                to={`/local/${posts[element]._id}`}
              >
                {posts[element].pic ? (
                  <img src={posts[element].pic} className="avatarSmall" />
                ) : (
                  <img src={img} className="avatarSmall" />
                )}
                <div className="nameCity">
                  <b>
                    <p>{posts[element].firstname}</p>
                    <p>{posts[element].city}</p>
                  </b>
                </div>
                <p>
                  {posts[element].categories[category].textfield.slice(0, 50)}
                </p>
                <p>{posts[element].categories[category].price} €</p>
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
