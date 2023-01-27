import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Searchbar from "./Searchbar";
import PostDisplay from "./PostDisplay";
// import optionsImp from "./options.json";
import cat1 from "./svg/business.svg";
import cat2 from "./svg/contract.svg";
import cat3 from "./svg/doctor.svg";
import cat4 from "./svg/mail.svg";
import cat5 from "./svg/reminder.svg";
import cat6 from "./svg/resume.svg";
import cat7 from "./svg/writer.svg";

const Home = ({ input, setInput }) => {
  // const options = optionsImp;
  const [selectedValue, setSelectedValue] = useState("All");
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [cityPosts, setCityPosts] = useState(null);
  const url = `https://backend-askalocal.onrender.com/local`;

  const getData = async (url) => {
    const data = await fetch(url)
      .then((data) => data.json())
      .catch((e) => setError(e));
    if (data.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    setPosts(data);
  };

  useEffect(() => {
    getData(url);
  }, []);

  const options = (
    <>
      <option value="City">City</option>
      <option value="Barcelona">Barcelona</option>
      <option value="Berlin">Berlin</option>
      <option value="Vienna">Vienna</option>
      <option value="Paris">Paris</option>
      <option value="Rom">Rom</option>
    </>
  );

  const findPosts = () => {
    if (input) {
      const result = input
        ? [
            // posts.filter(
            //   (post) =>
            //     post.name[lang].toLowerCase().includes(input.toLowerCase()),
            //   pokemons.filter((poke) =>
            //     Object.values(poke.type).find((element) =>
            //       element.toLowerCase().includes(input.toLowerCase())
            //     )
            //   )
            // ),
          ]
        : // )
          [];
      setSearchedPosts(result[0]);
      console.log(result);
    }
  };

  const filterCities = (city) => {
    if (city === "City") {
      setCityPosts(null);
      return;
    }
    let postList = posts?.locals.filter((el) => el.city === city);
    setCityPosts(postList);
    console.log("postlist", postList);
  };

  useEffect(() => {
    return () => {
      filterCities(selectedValue);
    };
  }, [selectedValue]);

  const category = "appointmentP";

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
        searchedPosts={searchedPosts}
        setSearchedPosts={setSearchedPosts}
        input={input}
        setInput={setInput}
        filterFunction={filterCities}
      />
      <Link to="/signup" state="gi" className="navLinks">
        Signup
      </Link>
      {posts ? <h2 className="sample">Sample Offers</h2> : []}
      {posts ? (
        <PostDisplay
          posts={cityPosts ? cityPosts : posts.locals}
          category={category}
          size={"small"}
          link={"all"}
        />
      ) : (
        []
      )}
      <div className="categoriesDiv">
        <div className="flex-row">
          <Link to="/email" className="categories">
            <img src={cat4} className="categoriesPic" alt="Email Reviews" />
            <p>Email Reviews</p>
          </Link>
          <Link to="/phone" className="categories">
            <img src={cat5} className="categoriesPic" alt="Phone Calls" />
            <p>Phone Calls</p>
          </Link>
          <Link to="/Flat" className="categories">
            <img src={cat1} className="categoriesPic" alt="Flat Viewings" />
            <p>Flat Viewings</p>
          </Link>
        </div>
        <div className="flex-row">
          <Link to="/appointments" className="categories">
            <img src={cat3} className="categoriesPic" alt="Appointments" />
            <p>Appointments</p>
          </Link>
          <Link to="/service" className="categories">
            <img src={cat2} className="categoriesPic" alt="Service Providers" />
            <p>Contact to Service Providers</p>
          </Link>
          <Link to="/interview" className="categories">
            <img src={cat7} className="categoriesPic" alt="Interview Help" />
            <p>Help with Interviews</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
