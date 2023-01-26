import React from "react";
import img from "./profile.png";
import "./PostDisplay.css";
import { Link } from "react-router-dom";

const PostDisplay = ({ posts }) => {
  let keys = null;

  return (
    <div className="postDisplay">
      <div className="postsDiv">
        {
          ((keys = Object.keys(posts)),
          keys?.map((element, i) => (
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
              <p>{posts[element].categories.appointmentP.category}</p>
              <p>{posts[element].categories.appointmentP.price} €</p>
            </Link>
          )))
        }
      </div>
    </div>
  );
};

export default PostDisplay;

// ((keys = Object.keys(item)),
//               keys.map((element, index) => (
