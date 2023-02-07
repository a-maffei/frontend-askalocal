import "./PostDisplay.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import cat from "./categories.json";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import PostDisplayLink from "./PostDisplayLink";

const PostDisplay = ({ posts, category, size, link, input }) => {
  const [price, setPrice] = useState(null);
  const [postToDisplay, setPostToDisplay] = useState(
    size === "home" ? posts : posts
  );
  let catKeys = null;
  // let current = "callp";
  const keys = Object.keys(cat);

  // useEffect(() => {
  // order && postOrder();
  // console.log("postdisplay", posts);
  // }, []);

  const newPostOrder = (x) => {
    if (price === "price") {
      if (x) {
        setPostToDisplay((postToDisplay) =>
          [...posts].sort((a, b) =>
            a.categories[category].price < b.categories[category].price ? 1 : -1
          )
        );
      } else {
        setPostToDisplay((postToDisplay) =>
          [...posts].sort((a, b) =>
            a.categories[category].price > b.categories[category].price ? 1 : -1
          )
        );
      }
    } else {
      if (x) {
        setPostToDisplay((postToDisplay) =>
          [...posts].sort((a, b) =>
            a.ratings?.reduce((c, d) => c + d, 0) / a.ratings?.length <
            b.ratings?.reduce((e, f) => e + f, 0) / b.ratings?.length
              ? 1
              : -1
          )
        );
      } else {
        setPostToDisplay((postToDisplay) =>
          [...posts].sort((a, b) =>
            a.ratings?.reduce((c, d) => c + d, 0) / a.ratings?.length >
            b.ratings?.reduce((e, f) => e + f, 0) / b.ratings?.length
              ? 1
              : -1
          )
        );
      }
    }
  };

  // element.categories[category].textfield
  //               .toLowerCase()
  //               .includes(input.toLowerCase()))

  // const postOrder = () => {
  //   if (order === "price") {
  //     if (up) {
  //       posts.sort(
  //         (a, b) =>
  //           // a.isComplete && b.isComplete ?
  //           a.categories[category].price < b.categories[category].price ? 1 : -1
  //         // : ""
  //       );
  //     } else {
  //       posts.sort((a, b) =>
  //         a.categories[category].price > b.categories[category].price ? 1 : -1
  //       );
  //     }
  //   }
  //   if (order === "rating") {
  //     if (up) {
  //       posts.sort((a, b) =>
  //         a.ratings?.reduce((c, d) => c + d, 0) / a.ratings?.length <
  //         b.ratings?.reduce((e, f) => e + f, 0) / b.ratings?.length
  //           ? 1
  //           : -1
  //       );
  //     } else {
  //       posts.sort((a, b) =>
  //         a.ratings?.reduce((c, d) => c + d, 0) / a.ratings?.length >
  //         b.ratings?.reduce((e, f) => e + f, 0) / b.ratings?.length
  //           ? 1
  //           : -1
  //       );
  //     }
  //   }
  // };

  // const getRandom = (localcat) => {
  //   const temp = Object.keys(localcat);
  //   catKeys = temp.filter((cat) => localcat[cat].textfield.length);
  //   current = catKeys[Math.floor(Math.random() * catKeys.length)];
  // };

  // const getRandom = () => {
  //   const temp = Object.keys(posts);
  //   catKeys = temp.filter((cat) => localcat[cat].textfield.length);
  //   current = catKeys[Math.floor(Math.random() * catKeys.length)];
  //   console.log("random");
  // };

  // console.log(posts);

  const options = (
    <>
      <option value="sort">Sort by</option>
      <option value="price">Price</option>
      <option value="rating">Rating</option>
    </>
  );

  const getRandom = (element) => {
    // const temp = Object.keys(element.categories);
    catKeys = keys.filter((cat) => element.categories[cat].textfield.length);
    // current = catKeys[Math.floor(Math.random() * catKeys.length)];
    return catKeys[Math.floor(Math.random() * catKeys.length)];
    // console.log("size", size, catKeys);
    // console.log("random", current);
    // console.log(element.categories[current]?.price);
  };

  return (
    <div className="post-macro-cont">
      {size !== "home" ? (
        <Link
          to={link === "all" ? `/categories` : `/categories/${category}`}
          className="  category-links"
        >
          <div className="absolute bright-bttn">
            {link === "all" ? `All Categories` : `${cat[category]}`}
          </div>
        </Link>
      ) : (
        ""
      )}

      <div className="postDisplay">
        <div className={size !== "big" ? "postDisplayInner" : ""}>
          <div className="sort">
            <select onChange={(e) => setPrice(e.target.value)}>
              {options}
            </select>
            <div className="sortArrows">
              <GoChevronDown
                className="postDisplayArrows"
                onClick={() => newPostOrder(false)}
              />
              <GoChevronUp
                className="postDisplayArrows"
                onClick={() => newPostOrder(true)}
              />
            </div>
          </div>

          {postToDisplay?.map(
            (element, i) =>
              // (size === "home" && getRandom(element.categories)) ||
              // ((input?.length < 1 ||
              //   (size === "home" &&
              //     element.categories[current]?.textfield
              //       .toLowerCase()
              //       .includes(input.toLowerCase())) ||
              //   element.categories[category].textfield
              //     .toLowerCase()
              //     .includes(input.toLowerCase())) &&
              //   element.categories[category].textfield?.length > 0) ? (
              size === "home" ||
              element.categories[category].textfield.length ? (
                <PostDisplayLink
                  element={element}
                  i={i}
                  category={size === "home" ? getRandom(element) : category}
                  size={size}
                  key={i}
                  input={input}
                />
              ) : (
                ""
              )
            // ) : (
            //   ""
            // )

          )}
        </div>
      </div>
    </div>
  );
};

export default PostDisplay;
