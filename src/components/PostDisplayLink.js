import React from "react";
import { Link } from "react-router-dom";
import img from "./pics/profile.png";
import { useEffect } from "react";
import cat from "./categories.json";

const PostDisplayLink = ({ element, i, category, size, input }) => {
  const keys = Object.keys(cat);
  let catKeys = null;
  let current = null;
  //   const wtf = () => {
  //     const temp = Object.values(
  //       cat.filter((el) => element.categories[el].textfield.length)
  //     );
  //   posts.categories.filter((el) => element.categories)
  // );
  // const tempzwo = posts.filter((ele) =>
  //   temp.map((elem) => ele.categories[elem]?.textfield.length)
  // );
  // const temp = Object.values(
  //   posts.map((element) => Object.keys(element.categories))
  // );
  // const blupp = posts.filter(
  //   (cat) => element.categories[cat]?.textfield.length > 0
  // );
  // console.log(temp, "what");
  //   };
  //   };
  // useEffect(() => {
  //   getRandom();
  // }, []);

  // const getRandom = () => {
  //   // const temp = Object.keys(element.categories);
  //   catKeys = keys.filter((cat) => element.categories[cat].textfield.length);
  //   current = catKeys[Math.floor(Math.random() * catKeys.length)];
  //   // console.log("size", size, catKeys);
  //   // console.log("random", current);
  //   // console.log(element.categories[current]?.price);
  // };

  // const findPosts = () => {
  //   if (posts && input) {
  //     const result = posts.filter((post) =>
  //       post.categories[category].textfield
  //         .toLowerCase()
  //         .includes(input.toLowerCase())
  //     );
  //     setPostToDisplay(result);
  //   }
  // };

  return (
    // size !== "home" ||
    element.categories[category]?.textfield
      .toString()
      .toLowerCase()
      .includes(input.toLowerCase()) ? (
      <Link key={i} className="postDiv" to={`/local/${element._id}`}>
        {element.pic ? (
          <div
            className="cat-avatarSmall"
            style={{
              backgroundImage: `url(${element.pic})`,
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
        <div className="cat-nameCity">
          <p className="cat-name">
            <b>{element.firstname}</b>
          </p>{" "}
          <p className="cat-label">
            <b>{element.city}</b>
          </p>
        </div>
        {/* {size === "home" ? (
        <div className="cat-message">
          <p>{element.categories[current]?.textfield}</p>
        </div>
      ) : ( */}
        <div className="cat-message">
          <p>"{element.categories[category]?.textfield}"</p>
          {/* {console.log(element.categories[category]?.textfield)} */}
        </div>
        {/* )} */}
        {/* {size === "home" ? (
        <div className="cat-price">
          <p>
            <b>{element.categories[current]?.price} €</b>
          </p>
        </div>
      ) : ( */}
        <div className="cat-price">
          <p>
            <b>{element.categories[category]?.price} €</b>
          </p>
        </div>
        {/* )} */}
      </Link>
    ) : (
      ""
    )
  );
};

export default PostDisplayLink;
