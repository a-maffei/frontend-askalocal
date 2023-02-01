import React from "react";
import Profile from "./Profile";
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
    </div>
  );
}
