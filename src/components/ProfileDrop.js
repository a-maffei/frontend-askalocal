import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./ProfileDrop.css";

export default function ProfileDrop({
  user,
  setUser,
  local,
  setLocal,
  type,
  isMenuOpen,
  setIsMenuOpen,
}) {
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside1 = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside1);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside1);
    };
  }, [isMenuOpen]);

  const handleClick = (e) => {
    // e.preventDefault();

    if (user) {
      setUser(null);
      localStorage.removeItem("user");
    }
    if (local) {
      setLocal(null);
      localStorage.removeItem("local");
    }
  };

  return (
    <div id="nav-drop-cont">
      {user && (
        <div
          id="profile-pic-cont"
          style={{
            backgroundImage: `url(${user?.pic}`,
            backgroundSize: "cover",
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          ref={ref}
        >
          {isMenuOpen ? (
            <ul id="nav-drop-menu">
              <li className="nav-menu-item">
                <Link to={"/welcome"} className="profileLink central">
                  <p>
                    {user.firstname} {`${user.lastname.charAt(0)}.`} (
                    {user.email})
                  </p>
                </Link>
              </li>
              <li className="nav-menu-item ">
                <Link to={"/messenger"} className="profileLink central">
                  Messages
                </Link>
              </li>
              <li className="nav-menu-item">
                <button onClick={handleClick}>Log out</button>
              </li>
            </ul>
          ) : null}
          {/* */}
        </div>
      )}{" "}
      {local && (
        <div
          id="profile-pic-cont"
          style={{
            backgroundImage: `url(${local.pic}`,
            backgroundSize: "cover",
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          ref={ref}
        >
          {isMenuOpen ? (
            <ul id="nav-drop-menu">
              <li className="nav-menu-item">
                <Link
                  to={local.isComplete ? "/yourinfo" : "/form"}
                  className="profileLink"
                >
                  {local.firstname} {`${local.lastname.charAt(0)}.`}
                  <br />
                  {local.email}
                </Link>
              </li>
              <li className="nav-menu-item ">
                <Link to={"/messenger"} className="profileLink central">
                  Messages
                </Link>
              </li>
              <li className="nav-menu-item">
                <button onClick={handleClick}>Log out</button>
              </li>
            </ul>
          ) : null}
          {/* */}
        </div>
      )}
    </div>
  );
}
