import React from "react";
import { Link } from "react-router-dom";
import img from "./pics/profile.png";

const PostDisplayLink = ({ element, i, current, category, size }) => {
  return (
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
            {console.log("this is the most current", current, element)}
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
  );
};

export default PostDisplayLink;
