import "./PostDisplay.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import cat from "./categories.json";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import PostDisplayLink from "./PostDisplayLink";

const PostDisplay = ({ posts, category, size, link, input, selectedValue }) => {
  const [price, setPrice] = useState(null);

  function filterCities(city) {
    console.log("City", city);
    if (city === "City") {
      setPostToDisplay(posts);
      console.log("postlist", postToDisplay);
      return;
    }
    setPostToDisplay([...posts]?.filter((el) => el.city === city));
  }

  useEffect(() => {
    filterCities(selectedValue);
  }, [selectedValue]);

  const [postToDisplay, setPostToDisplay] = useState([...posts]);
  let catKeys = null;
  const keys = Object.keys(cat);

  const newPostOrder = (x) => {
    if (price === "price") {
      if (x) {
        setPostToDisplay((postToDisplay) =>
          [...posts].sort((a, b) =>
            a.categories[category].price > b.categories[category].price ? 1 : -1
          )
        );
      } else {
        setPostToDisplay((postToDisplay) =>
          [...posts].sort((a, b) =>
            a.categories[category].price < b.categories[category].price ? 1 : -1
          )
        );
      }
    } else {
      if (x) {
        setPostToDisplay((postToDisplay) =>
          [...posts].sort((a, b) =>
            a.ratings?.reduce((c, d) => c + d, 0) / a.ratings?.length >
            b.ratings?.reduce((e, f) => e + f, 0) / b.ratings?.length
              ? 1
              : -1
          )
        );
      } else {
        setPostToDisplay((postToDisplay) =>
          [...posts].sort((a, b) =>
            a.ratings?.reduce((c, d) => c + d, 0) / a.ratings?.length <
            b.ratings?.reduce((e, f) => e + f, 0) / b.ratings?.length
              ? 1
              : -1
          )
        );
      }
    }
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
            (element, i) => (
              // input?.length < 1 ||
              // (size === "home" &&
              //   element.categories[element.current]?.textfield
              //     .toLowerCase()
              //     .includes(input.toLowerCase())) ||
              // element.categories[category].textfield
              //   .toLowerCase()
              //   .includes(input.toLowerCase()) ? (
              <PostDisplayLink
                element={element}
                i={i}
                category={size === "home" ? element.current : category}
                size={size}
                key={i}
                input={input}
              />
            )
            // ) : (
            //   ""
            // )
            // ) : (
            // ""
            // )
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDisplay;
