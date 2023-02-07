import "./PostDisplay.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import cat from "./categories.json";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import PostDisplayLink from "./PostDisplayLink";

const PostDisplay = ({ posts, category, size, link, input }) => {
  const [order, setOrder] = useState(null);
  // let keys = Object.keys(posts);
  const [up, setUp] = useState(true);
  let catKeys = null;
  let current = null;

  useEffect(() => {
    order && postOrder();
    console.log("postdisplay", posts);
  }, [order, up]);

  const postOrder = () => {
    if (order === "price") {
      if (up) {
        posts.sort(
          (a, b) =>
            // a.isComplete && b.isComplete ?
            a.categories[category].price < b.categories[category].price ? 1 : -1
          // : ""
        );
      } else {
        posts.sort((a, b) =>
          a.categories[category].price > b.categories[category].price ? 1 : -1
        );
      }
    }
    if (order === "rating") {
      if (up) {
        posts.sort((a, b) =>
          a.ratings?.reduce((c, d) => c + d, 0) / a.ratings?.length <
          b.ratings?.reduce((e, f) => e + f, 0) / b.ratings?.length
            ? 1
            : -1
        );
      } else {
        posts.sort((a, b) =>
          a.ratings?.reduce((c, d) => c + d, 0) / a.ratings?.length >
          b.ratings?.reduce((e, f) => e + f, 0) / b.ratings?.length
            ? 1
            : -1
        );
      }
    }
  };

  const getRandom = (localcat) => {
    const temp = Object.keys(localcat);
    catKeys = temp.filter((cat) => localcat[cat].textfield.length);
    current = catKeys[Math.floor(Math.random() * catKeys.length)];
    console.log("random");
  };

  const options = (
    <>
      <option value="sort">Sort by</option>
      <option value="price">Price</option>
      <option value="rating">Rating</option>
    </>
  );

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
            <select onChange={(e) => setOrder(e.target.value)}>
              {options}
            </select>
            <div className="sortArrows">
              <GoChevronDown
                className="postDisplayArrows"
                onClick={() => setUp(() => false)}
              />
              <GoChevronUp
                className="postDisplayArrows"
                onClick={() => setUp(() => true)}
              />
            </div>
          </div>
          {posts?.map((element, i) =>
            (size === "home" && getRandom(element.categories)) ||
            ((input?.length < 1 ||
              (size === "home" &&
                element.categories[current]?.textfield
                  .toLowerCase()
                  .includes(input.toLowerCase())) ||
              element.categories[category].textfield
                .toLowerCase()
                .includes(input.toLowerCase())) &&

              element.categories[category].textfield?.length > 0) ? (
              <PostDisplayLink
                element={element}
                i={i}
                current={current}
                category={category}
                size={size}
              />

            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDisplay;
