import img from "./pics/profile.png";
import "./PostDisplay.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import cat from "./categories.json";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

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
        <Link to={link === "all" ? `/categories` : `/categories/${category}`}>
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
                {size === "home" ? (
                  <div className="cat-message">
                    <p>
                      {console.log(current, "wtf")}
                      {element.categories[current].textfield}
                      {console.log(
                        "this is the most current",
                        current,
                        element
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="cat-message">
                    <p>"{element.categories[category].textfield}"</p>
                  </div>
                )}
                {size === "home" ? (
                  <div className="cat-price">
                    <p>
                      <b>{element.categories[current]?.price} €</b>
                    </p>
                  </div>
                ) : (
                  <div className="cat-price">
                    <p>
                      <b>{element.categories[category].price} €</b>
                    </p>
                  </div>
                )}
              </Link>
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
