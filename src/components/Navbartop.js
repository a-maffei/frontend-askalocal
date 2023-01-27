import { NavLink } from "react-router-dom";
import ProfileDrop from "./ProfileDrop";
import React from "react";
import "./Navbartop.css";
import image from "./pics/logo.png";

const Navbartop = ({ switchTheme, user, setUser, local, setLocal }) => {
  return (
    <div className="navbar">
      <NavLink to="/" className="navLinks">
        <img src={image} alt="PC" className="imgNavbar" />
      </NavLink>
      <div className="navbarTwo">
        {user ? (
          <ProfileDrop user={user} setUser={setUser} type="user" />
        ) : local ? (
          <ProfileDrop local={local} setLocal={setLocal} type="local" />
        ) : (
          <div>
            <NavLink to="/user-signup" state="gi" className="navLinks">
              Signup
            </NavLink>
            <NavLink to="/user-login" state="login" className="navLinks">
              Login
            </NavLink>
            <NavLink to="/local-signup" state="gi" className="navLinks">
              Join us
            </NavLink>
            <NavLink to="/local-login" state="gi" className="navLinks">
              Sign up
            </NavLink>
          </div>
        )}

        <div id="toggledark" title={"(De)activate dark mode"}>
          <label className="switch">
            <input id="dark" type="checkbox" />
            <span onClick={() => switchTheme()} className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbartop;
