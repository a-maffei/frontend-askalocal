import React from "react";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./LocalInfo.css";
import "./YourInfo.css";

export default function YourInfo({ local }) {
  console.log(local);

  return (
    <div className="profile-local-cont">
      <h3 className="greeting-title">
        Hi there, {local.firstname}! <br></br>
      </h3>
      <h4 className="greeting-subtitle">
        Here's the profile you've created. Soon you'll be contacted by newcomers
        in {local.city}.
      </h4>
      <Profile local={local} />{" "}
      <h3 className="greeting-subtitle">
        Curious about the rest of our locals community in your city and all over
        the world?
      </h3>
      <Link to="/categories">
        <button className="bright-bttn">Discover our offering</button>
      </Link>
    </div>
  );
}
