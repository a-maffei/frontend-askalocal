import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Searchbar from "./Searchbar";
import { CircleFlag } from "react-circle-flags";
import { GoChevronDown } from "react-icons/go";
import { HashLink } from "react-router-hash-link";
import PostDisplay from "./PostDisplay";
import cat1 from "./svg/business.svg";
import cat2 from "./svg/contract.svg";
import cat3 from "./svg/doctor.svg";
import cat4 from "./svg/mail.svg";
import cat5 from "./svg/reminder.svg";
import cat6 from "./svg/writer.svg";
import AboutUs from "./AboutUs";
import ImageSlide from "./ImageSlide";

import cat from "./categories.json";

const Home = ({ input, setInput, selectedValue, setSelectedValue }) => {
  // const options = optionsImp;
  // const [selectedValue, setSelectedValue] = useState("City");
  let catKeys = null;
  const keys = [
    "appointmentP",
    "callP",
    "emailP",
    "flatP",
    "interviewP",
    "serviceP",
  ];
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [cityPosts, setCityPosts] = useState([]);
  const url = `https://backend-askalocal.onrender.com/local/sample`;
  const url2 = "http://localhost:8080/local/sample";

  const getData = async (url) => {
    const data = await fetch(url);
    const parsedData = await data.json();
    // .then((data) => data.json())
    // .catch((e) => console.log(e.message.value));
    if (!data.ok) {
      throw new Error("Not Found", { status: data.status });
    }
    // posts.map((el) => ({ ...el, current: getRandom(el) }));
    setCityPosts(
      parsedData.locals.map((el) => ({ ...el, current: getRandom(el) }))
    );
    setPosts(parsedData.locals);
    console.log(parsedData);
  };

  useEffect(() => {
    getData(url);
  }, []);

  // const findPosts = () => {
  //   if (input) {
  //     const result = input
  //       ? [
  // posts.filter(
  //   (post) =>
  //     post.name[lang].toLowerCase().includes(input.toLowerCase()),
  //   pokemons.filter((poke) =>
  //     Object.values(poke.type).find((element) =>
  //       element.toLowerCase().includes(input.toLowerCase())
  //     )
  //   )
  // ),
  // ]
  // )
  //         [];
  //     setSearchedPosts(result[0]);
  //     console.log(result);
  //   }
  // };

  // const filterCities = (city) => {
  //   console.log("City", city);
  //   if (city === "City") {
  //     setCityPosts(posts);
  //     console.log("postlist", cityPosts);
  //     return;
  //   }
  //   setCityPosts([...posts]?.filter((el) => el.city === city));
  // };

  // useEffect(() => {
  //   //   return () => {
  //   selectedValue !== "City"
  //     ? filterCities(selectedValue)
  //     : setCityPosts([...posts]);
  //   //   };
  // }, [selectedValue]);

  const category = "appointmentP";

  function getRandom(element) {
    // const temp = Object.keys(element.categories);
    catKeys = keys.filter((cat) => element.categories[cat].textfield.length);
    // current = catKeys[Math.floor(Math.random() * catKeys.length)];
    return catKeys[Math.floor(Math.random() * catKeys.length)];
    // console.log("size", size, catKeys);
    // console.log("random", current);
    // console.log(element.categories[current]?.price);
  }

  // function doStuff() {
  //   posts.map((el) => ({ ...el, current: getRandom(el) }));
  // }

  return (
    <div className="home">
      <div className="homeDiv">
        <div className="homeDiv-titles">
          <h2>New in a city where you don't speak the language?</h2>
          <h3>Let the locals help you out.</h3>
        </div>
        <div className="homeDiv-img">
          <ImageSlide />
        </div>
      </div>
      <div className="bright-bttn-cont">
        <Link to="/user-signup" state="gi">
          <button className="bright-bttn">Sign up for free</button>
        </Link>
        <HashLink to="/#search-section">
          <GoChevronDown className="homepage-arrow" />
        </HashLink>
      </div>
      <div id="search-section"></div>
      <div className="home-cont-black">
        <h2 className="section-title-white">You ask, they translate.</h2>
        <div className="home-flags-cont">
          <CircleFlag countryCode="de" height="40" />
          <CircleFlag countryCode="fr" height="40" />
          <CircleFlag countryCode="es" height="40" />
          <CircleFlag countryCode="at" height="40" />
          <CircleFlag countryCode="it" height="40" />
        </div>
        <Searchbar
          setSelectedValue={setSelectedValue}
          selectedValue={selectedValue}
          searchedPosts={searchedPosts}
          setSearchedPosts={setSearchedPosts}
          input={input}
          setInput={setInput}
          // filterFunction={filterCities}
        />

        {/* (size === "home" &&
                element.categories[element.current]?.textfield
                  .toLowerCase()
                  .includes(input.toLowerCase())) ||
              element.categories[category].textfield
                .toLowerCase()
                .includes(input.toLowerCase()) ? ( */}

        {cityPosts.length &&
        (input?.length < 1 ||
          cityPosts?.some((el) =>
            el.categories[el.current]?.textfield
              .toLowerCase()
              .includes(input.toLowerCase())
          )) ? (
          // {cityPosts.length ? (
          <PostDisplay
            posts={cityPosts}
            category={category}
            size={"home"}
            link={"all"}
            input={input}
            selectedValue={selectedValue}
          />
        ) : (
          <p className="no-result">No post matches your search criteria</p>
        )}
        {console.log(cityPosts)}
        {/* ) : (
          <p>Nothing to see here...move along</p>
        )} */}
      </div>
      <div className="home-cont-white" id="howitworks-section">
        <h2 className="section-title-black">How it works</h2>
        <h4 className="paragraph-title-black">
          Once you have an account, browse through our list of locals in your
          new city. <br></br>When you find the one that suits your needs, you
          can start chatting with them (in English) to agree on the details and
          final price. Payment takes place on our platform, too. Then you're all
          set!{" "}
        </h4>
        <div className="card-macro-cont">
          <div className="cardOuterDiv">
            <Link to="/categories/emailP" className="categoriesDiv">
              <div className="cat-container">
                <img src={cat4} className="categoriesPic" alt="Email Reviews" />
                <p>Email Reviews</p>
              </div>
            </Link>
          </div>
          <div className="cardOuterDiv">
            <Link to="/categories/callP" className="categoriesDiv">
              <div className="cat-container">
                <img src={cat5} className="categoriesPic" alt="Phone Calls" />
                <p>Phone Calls</p>
              </div>
            </Link>
          </div>
          <div className="cardOuterDiv">
            <Link to="/categories/flatP" className="categoriesDiv">
              <div className="cat-container">
                <img src={cat1} className="categoriesPic" alt="Flat Viewings" />
                <p>Flat Viewings</p>
              </div>
            </Link>
          </div>
          <div className="cardOuterDiv">
            <Link to="/categories/appointmentP" className="categoriesDiv">
              <div className="cat-container">
                {" "}
                <img src={cat3} className="categoriesPic" alt="Appointments" />
              </div>
              <p>Meetings</p>
            </Link>
          </div>
          <div className="cardOuterDiv">
            <Link to="/categories/serviceP" className="categoriesDiv">
              <div className="cat-container">
                <img
                  src={cat2}
                  className="categoriesPic"
                  alt="Service Providers"
                />
                <p>Service Providers</p>
              </div>
            </Link>
          </div>
          <div className="cardOuterDiv">
            <Link to="/categories/interviewP" className="categoriesDiv">
              <div className="cat-container">
                <img src={cat6} className="categoriesPic" alt="Job Search" />
                <p>Interview practice</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="home-cont-green" id="aboutus-section">
        <h2 className="section-title-green">About us</h2>
        <h4 className="paragraph-title-green">
          We're web developers coming from all around Europe. We know how it
          feels to move to a new country, and how important it is to help
          newcomers feel at home. <br></br>
          <br></br>We built this website using: React, Node.js, Express,
          MongoDB, Mongoose, and Cloudinary.
        </h4>
      </div>
      <AboutUs />
    </div>
  );
};

export default Home;
