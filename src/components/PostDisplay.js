import React from "react";
import img from "./pics/profile.png";
import "./PostDisplay.css";
import { Link } from "react-router-dom";
import cat from "./categories.json";
import { useEffect } from "react";

const PostDisplay = ({ posts, category, size, link, input }) => {
  let keys = Object.keys(posts);
  console.log("input", input);

  // input.length > 0 &&
  // posts[element].categories[category].textfield.contains(input) ?

  // useEffect(() => {
  //   console.log(
  //     posts.some((element) =>
  //       Object.values(element?.categories[category]).includes("trans")
  //     )
  //   );
  // .includes(input);
  // posts.forEach(
  //   (element) =>
  //     Object.values(element?.categories[category]).includes("trans")
  //   ,
  // posts[Object].categories[category]?.textfield
  //   .toLowerCase()
  //   .includes("trans")
  // }, [input]);

  return (
    <div>
      {/* {input?.length < 1 ||
      (input?.length > 0 &&
        posts.find((element) =>
          element.categories[category].textfield.toLowerCase().includes(input)
        )) ? ( */}
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
          {keys?.map((element, i) =>
            posts[element].categories &&
            (input?.length < 1 ||
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
          )}
        </div>{" "}
      </div>
      {/* ) : (
        [] */}
      {/* )} */}
    </div>
  );
};

export default PostDisplay;

// ((keys = Object.keys(item)),
//               keys.map((element, index) => (
