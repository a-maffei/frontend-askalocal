import { useEffect, useRef, useState } from "react";
import "./ProfileDrop.css";

export default function ProfileDrop({ user, setUser, local, setLocal, type }) {
  const ref = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  const handleClick = () => {
    localStorage.removeItem(type);
    setUser(null);
    // navigate("/");
  };

  return (
    <div id="nav-drop-cont">
      <div
        id="profile-pic-cont"
        style={{
          backgroundSize: "cover",
        }}
        onClick={() => setIsMenuOpen(true)}
      >
        {isMenuOpen ? (
          <ul id="nav-drop-menu" ref={ref}>
            <li className="nav-menu-item">
              <p>
                {user.firstname} {`${user.lastname.charAt(0)}.`} ({user.email})
              </p>
            </li>
            <li className="nav-menu-item">
              <button onClick={handleClick}>Log out</button>
            </li>
          </ul>
        ) : null}
        {/* */}
      </div>
    </div>
  );
}
