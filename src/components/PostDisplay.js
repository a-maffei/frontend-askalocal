import img from "./pics/profile.png";
import "./PostDisplay.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import cat from "./categories.json";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const PostDisplay = ({ posts, category, size, link, input }) => {
  const [order, setOrder] = useState(null);
  let keys = Object.keys(posts);
  const [up, setUp] = useState(true);

  useEffect(() => {
    postOrder();
  }, [order, up]);

  const postOrder = () => {
    if (order === "price") {
      if (up) {
        posts.sort(
          (a, b) => a.categories[category].price < b.categories[category].price
        );
      } else {
        posts.sort(
          (a, b) => a.categories[category].price > b.categories[category].price
        );
      }
    }
    if (order === "rating") {
      if (up) {
        posts.sort(
          (a, b) =>
            a.ratings?.reduce((c, d) => c + d, 0) / a.ratings?.length <
            b.ratings?.reduce((e, f) => e + f, 0) / b.ratings?.length
        );
      } else {
        posts.sort(
          (a, b) =>
            a.ratings?.reduce((c, d) => c + d, 0) / a.ratings?.length >
            b.ratings?.reduce((e, f) => e + f, 0) / b.ratings?.length
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
        <Link to={link === "all" ? `/categories` : `/categories/${category}`}>
          <div className="absolute bright-bttn">
            {link === "all" ? `All Categories` : `${cat[category]}`}
          </div>
        </Link>
      ) : (
        ""
      )}

      <div className={size !== "big" ? "postDisplay" : "postDisplayBig"}>
        <div className="sort">
          <select onChange={(e) => setOrder(e.target.value)}>{options}</select>
          <GoChevronDown
            className="postDisplayArrows"
            onClick={() => setUp(() => false)}
          />
          <GoChevronUp
            className="postDisplayArrows"
            onClick={() => setUp(() => true)}
          />
        </div>
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
            <div key={i} />
          )
        )}
      </div>
    </div>
  );
};

export default PostDisplay;
