import React from "react";
import img from "./profile.png";
import "./PostDisplay.css";

const PostDisplay = ({ posts }) => {
  let keys = null;

  return (
    <div className="postDisplay">
      <div className="postsDiv">
        {
          ((keys = Object.keys(posts)),
          keys?.map((element, i) => (
            <div key={i} className="postDiv">
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
              <p>{posts[element].appointmentP.category}</p>
              <p>{posts[element].appointmentP.price} €</p>
            </div>
          )))
        }
      </div>
    </div>
  );
};

export default PostDisplay;

// ((keys = Object.keys(item)),
//               keys.map((element, index) => (
