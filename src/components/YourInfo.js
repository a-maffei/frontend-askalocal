import React from "react";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import "./LocalInfo.css";

export default function YourInfo({ local }) {
  console.log(local);
  return (
    <div className="home">
      <h3>
        Hi there, {local.firstname}! Thank you for contributing to Ask A Local.{" "}
        <br></br>
      </h3>
      <h4>
        Here's the profile you've created. Soon you'll be contacted by newcomers
        in {local.city}.
      </h4>
      <Profile local={local} />{" "}
      <h3>
        Curious about the rest of our locals community in your city and all over
        the world?
      </h3>
      <Link to="/categories">
        <button>Discover our offering</button>
      </Link>
    </div>
  );
}
