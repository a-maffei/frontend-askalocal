import { Link, NavLink } from "react-router-dom";
import ProfileDrop from "./ProfileDrop";
import { useRef, useState, useEffect } from "react";
import { NavHashLink } from "react-router-hash-link";
import React from "react";
import "./Navbartop.css";
import logo from "./svg/default-monochrome-black.svg";
import { ReactComponent as Logo } from "./svg/default-monochrome-black.svg";
const Navbartop = ({ switchTheme, user, setUser, local, setLocal }) => {
  const ref = useRef();

  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isMainMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMainMenuOpen(false);
      }

      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMainMenuOpen, isMenuOpen]);

  return (
    <div className="navbar">
      {/*       <img
        src={logo}
        alt="PC"
        className="imgNavbar"
        style={{ textColor: "blue" }}
      /> */}{" "}
      <NavLink className="nav-logo-link" to="/">
        <>
          <Logo alt="PC" className="imgNavbar" />
        </>
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
            <NavHashLink
              to="/#howitworks-section"
              state="how-it-works"
              className="navLinks"
              // etc...
            >
              How it works
            </NavHashLink>
            <NavLink to="/about-us" state="about-us" className="navLinks">
              About us
            </NavLink>

            <NavLink to="/user-signup" state="gi" className="navLinks">
              Signup
            </NavLink>
            <NavLink to="/user-login" state="login" className="navLinks">
              Login
            </NavLink>
            <button
              onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
              id="main-nav-drop-cont"
              className="bttn-primary nav-local-bttn"
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
