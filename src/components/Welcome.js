import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import { CircleFlag } from "react-circle-flags";
import "./Welcome.css";

export default function Welcome({
  user,
  input,
  setInput,
  selectedValue,
  setSelectedValue,
}) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    switch (user.city) {
      case "Berlin":
        setGreeting("🇩🇪 Hallo");
        break;
      case "Barcelona":
        setGreeting("🇪🇸 Hola");
        break;
      case "Paris":
        setGreeting("🇫🇷 Salut");
        break;
      case "Rome":
        setGreeting("🇮🇹 Ciao");
        break;
      default:
        setGreeting("Hi");
    }
  }, []);

  /*  
  } */

  return (
    <>
      <div id="greeting-bg">
        <h1 className="section-title-green">
          {greeting}, {user.firstname}!
        </h1>
        <h3 className="paragraph-title-green">
          Our community of locals in is ready to help you for all your
          language-related needs. Select your city below and start browsing
          around.
        </h3>
      </div>

      <Categories
        input={input}
        setInput={setInput}
        user={user}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
    </>
  );
}
