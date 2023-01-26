import React, { useEffect, useState } from "react";
import "./Welcome.css";

export default function Welcome({ user }) {
  console.log(user);

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
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      case "Rome":
        setGreeting("🇮🇹 Ciao");
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      default:
        setGreeting("Hi");
    }
  }, []);

  /*  
  } */

  return (
    <div id="greeting-bg">
      <h1>
        {greeting}, {user.firstname}!
      </h1>
      <h3>
        Our community of locals in {user.city} is ready to help you for all your
        language-related needs. <br></br>
        Want to look for help in another city? Change the settings below!
      </h3>
    </div>
  );
}
