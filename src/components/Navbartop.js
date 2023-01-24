import { NavLink } from "react-router-dom";
import React from "react";
import "./Navbartop.css";
import image from "./logo.png";

const Navbartop = ({ switchTheme, user }) => {
  return (
    <div className="navbar">
      <NavLink to="/" className="navLinks">
        <img src={image} alt="PC" className="imgNavbar" />
      </NavLink>
      <div className="navbarTwo">
        <NavLink to="/signup" state="gi" className="navLinks">
          Signup
        </NavLink>
        <NavLink to="/login" state="login" className="navLinks">
          {user ? "Logout" : "Login"}
        </NavLink>
        <NavLink to="/signup" state="gi" className="navLinks">
          Localsignup
        </NavLink>

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
