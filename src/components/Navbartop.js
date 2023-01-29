import { NavLink } from "react-router-dom";
import ProfileDrop from "./ProfileDrop";
import { useRef, useState, useEffect } from "react";
import React from "react";
import "./Navbartop.css";
import image from "./pics/logo.png";

const Navbartop = ({ switchTheme, user, setUser, local, setLocal }) => {
  const ref = useRef();

  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isMainMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMainMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMainMenuOpen]);

  return (
    <div className="navbar">
      <NavLink to="/" className="navLinks">
        <img src={image} alt="PC" className="imgNavbar" />
      </NavLink>
      <div className="navbarTwo">
        {user ? (
          <ProfileDrop
            user={user}
            setUser={setUser}
            type="user"
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        ) : local ? (
          <ProfileDrop
            local={local}
            setLocal={setLocal}
            type="local"
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        ) : (
          <div>
            <NavLink to="/user-signup" state="gi" className="navLinks">
              Signup
            </NavLink>
            <NavLink to="/user-login" state="login" className="navLinks">
              Login
            </NavLink>
            <button
              onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
              id="main-nav-drop-cont"
              className="navLinks"
              ref={ref}
            >
              {" "}
              {isMainMenuOpen ? (
                <div id="main-nav-drop-menu">
                  <NavLink
                    to="/local-signup"
                    state="gi"
                    className="nav-local-drop"
                  >
                    Join us
                  </NavLink>
                  <NavLink
                    to="/local-login"
                    state="gi"
                    className="nav-local-drop"
                  >
                    LoginLocal
                  </NavLink>
                </div>
              ) : null}{" "}
              For Locals
            </button>
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
