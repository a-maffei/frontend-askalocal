import img from "./pics/profile.png";
import "./PostDisplay.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import cat from "./categories.json";
import { useEffect } from "react";

const PostDisplay = ({ posts, category, size, link, input }) => {
  let keys = Object.keys(posts);
  console.log("input", input);

  console.log("POSSSSSTTTTSSS", posts, "length: ", posts.length);

  // input.length > 0 &&
  // posts[element].categories[category].textfield.contains(input) ?

  // useEffect(() => {
  //   const what = Object.values(posts[0].categories[category]);
  //   const whatone = what;
  //   console.log(
  //     "first",
  //     posts.some(
  //       (element) =>
  //         -1 !==
  //         Object.values(element.categories[category]).findIndex((elem) =>
  //           elem.toString().toLowerCase().includes(input)
  //         )
  //     ),
  //     // .map((el) => el)

  //     "what",
  //     what.findIndex((elem) => elem.toString().includes(input)),
  //     what
  //     // .includes(input.toLowerCase())
  //   );
  //   console.log(
  //     Object.values(posts[0].categories[category]).map((el) =>
  //       Object.values(el).includes(input.toLowerCase())
  //     ),
  //     // Object.values(posts[0].categories[category])[0],
  //     Object.values(posts[0].categories[category]).find((el) =>
  //       Object.values(el).includes(input.toLowerCase())
  //     )
  //     // posts.some((element) => Object.values(element?.categories[category]))
  //   );
  // Object.values(posts[0].categories[category])
  //.includes(input);
  // posts.forEach(
  //   (element) =>
  //     Object.values(element?.categories[category]).includes("trans")
  //   ,
  // posts[Object].categories[category]?.textfield
  //   .toLowerCase()
  //   .includes("trans")
  // }, [input]);

  return (
    <div className="post-macro-cont">
      {size !== "home" ? (
        <Link to={link === "all" ? `/categories` : `/categories/${category}`}>
          <div className="absolute bright-bttn">
            {link === "all" ? `Category Overview` : `${cat[category]}`}
          </div>
        </Link>
      ) : (
        ""
      )}
      <div
        className={
          size === "small"
            ? "postDisplay"
            : size === "home"
            ? "postDisplayHome"
            : "postDisplayBig"
        }
      >
        {keys?.map((element, i) =>
          posts[element]?.categories &&
          (input?.length < 1 ||
            posts[element].categories[category].textfield
              .toLowerCase()
              .includes(input.toLowerCase())) &&
          posts[element].categories[category].textfield?.length > 0 ? (
            <Link
              key={i}
              className="postDiv"
              to={`/local/${posts[element]._id}`}
            >
              {posts[element].pic ? (
                <div
                  className="cat-avatarSmall"
                  style={{
                    backgroundImage: `url(${posts[element].pic})`,
                    backgroundSize: "cover",
                  }}
                ></div>
              ) : (
                <div
                  className="cat-avatarSmall"
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                  }}
                ></div>
              )}
              {/*                 {posts[element].pic ? (
                  <img src={posts[element].pic} className="cat-avatarSmall" />
                ) : (
                  <img src={img} className="cat-avatarSmall" />
                )} */}
              <div className="cat-nameCity">
                <p className="cat-name">
                  <b>{posts[element].firstname}</b>
                </p>{" "}
                <p className="cat-label">
                  <b>{posts[element].city}</b>
                </p>
              </div>
              <div className="cat-message">
                <p>"{posts[element].categories[category].textfield}"</p>
              </div>
              <div className="cat-price">
                <p>
                  <b>{posts[element].categories[category].price} €</b>
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )
        )}
      </div>
    </div>
  );
};

export default PostDisplay;

// ((keys = Object.keys(item)),
//               keys.map((element, index) => (
