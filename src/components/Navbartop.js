import { Link, NavLink, useLocation } from "react-router-dom";
import ProfileDrop from "./ProfileDrop";
import { useRef, useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import React from "react";
import "./Navbartop.css";
import logo from "./svg/default-monochrome-black.svg";
import { ReactComponent as Logo } from "./svg/default-monochrome-black.svg";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbartop = ({ switchTheme, user, setUser, local, setLocal }) => {
  const ref = useRef();
  const { hash } = useLocation();
  const isActive = (iHash) => hash === iHash;
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const showNavbar = () => {
    setIsClicked(!isClicked);
  };

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
    <div className={isClicked ? "navbar extended-nav" : "navbar"}>
      {/*       <img
        src={logo}
        alt="PC"
        className="imgNavbar"
        style={{ textColor: "blue" }}
      /> */}{" "}
      <HashLink to="/#top" state="homeTop" className="nav-logo-link">
        <>
          <Logo alt="PC" className="imgNavbar" />
        </>
      </HashLink>
      <div className="navbarTwo">
        {user ? (
          <>
            <div
              className={
                isClicked ? "responsive-nav  visible-nav" : "responsive-nav"
              }
            >
              <HashLink
                to="/#howitworks-section"
                state="how-it-works"
                className={
                  isActive("#howitworks-section")
                    ? "active navLinks"
                    : "navLinks"
                }
                // etc...
              >
                How it works
              </HashLink>
              <HashLink
                to="/#aboutus-section"
                state="about-us"
                className={
                  isActive("#aboutus-section") ? "active navLinks" : "navLinks"
                }
                // etc...
              >
                About us
              </HashLink>
            </div>
            <div className="mobile-bttn-cont" onClick={showNavbar}>
              {" "}
              {isClicked ? (
                <button className="nav-bttn">
                  <FaTimes />
                </button>
              ) : (
                <button className="nav-bttn">
                  <FaBars />
                </button>
              )}
            </div>
            <ProfileDrop
              user={user}
              setUser={setUser}
              type="user"
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </>
        ) : local ? (
          <>
            <div
              className={
                isClicked ? "responsive-nav  visible-nav" : "responsive-nav"
              }
            >
              <HashLink
                to="/#howitworks-section"
                state="how-it-works"
                className={
                  isActive("#howitworks-section")
                    ? "active navLinks"
                    : "navLinks"
                }
                // etc...
              >
                How it works
              </HashLink>
              <HashLink
                to="/#aboutus-section"
                state="about-us"
                className={
                  isActive("#aboutus-section") ? "active navLinks" : "navLinks"
                }
                // etc...
              >
                About us
              </HashLink>
            </div>
            <div className="mobile-bttn-cont" onClick={showNavbar}>
              {" "}
              {isClicked ? (
                <button className="nav-bttn">
                  <FaTimes />
                </button>
              ) : (
                <button className="nav-bttn">
                  <FaBars />
                </button>
              )}
            </div>
            <ProfileDrop
              local={local}
              setLocal={setLocal}
              type="local"
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </>
        ) : (
          <>
            <div
              className={
                isClicked ? "responsive-nav  visible-nav " : "responsive-nav"
              }
            >
              <HashLink
                to="/#howitworks-section"
                state="how-it-works"
                className={
                  isActive("#howitworks-section")
                    ? "active navLinks"
                    : "navLinks"
                }
                // etc...
              >
                How it works
              </HashLink>
              <HashLink
                to="/#aboutus-section"
                state="about-us"
                className={
                  isActive("#aboutus-section") ? "active navLinks" : "navLinks"
                }
                // etc...
              >
                About us
              </HashLink>

              <NavLink to="/user-signup" state="gi" className="navLinks">
                Sign up
              </NavLink>
              <NavLink to="/user-login" state="login" className="navLinks">
                Log in
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
                      Log in
                    </NavLink>
                  </div>
                ) : null}{" "}
                For Locals
              </button>
            </div>
            <div className="mobile-bttn-cont" onClick={showNavbar}>
              {" "}
              {isClicked ? (
                <button className="nav-bttn">
                  <FaTimes />
                </button>
              ) : (
                <button className="nav-bttn">
                  <FaBars />
                </button>
              )}
            </div>
          </>
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
