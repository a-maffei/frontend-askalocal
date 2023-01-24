import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
import Searchbar from "./Searchbar";
import optionsImp from "./options.json";

const Home = () => {
  const options = optionsImp;
  const [selectedValue, setSelectedValue] = useState(options[0].value);
  return (
    <div className="home">
      <div className="homeDiv">
        <h1>Ask a Local</h1>
        <h2>The best place to get help in a foreign country</h2>
      </div>
      <Searchbar
        options={options}
        setSelectedValue={setSelectedValue}
        selectedValue={selectedValue}
      />
      <NavLink to="/signup" state="gi" className="navLinks">
        Signup
      </NavLink>
    </div>
  );
};

export default Home;
