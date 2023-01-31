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
  const url2 = "http://localhost:8080/local";

  const getData = async (url) => {
    const data = await fetch(url)
      .then((data) => data.json())
      .catch((e) => setError(e));
    if (data.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    setPosts(data);
    console.log(data);
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
      <option value="Rom">Rome</option>
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
        <div className="homeDiv-titles">
          <h2>New in a city where you don't speak the language?</h2>
          <h3>Let the locals help you.</h3>
        </div>
        <div className="bright-bttn-cont">
          <Link to="/user-signup" state="gi">
            <button className="bright-bttn">Sign up for free</button>
          </Link>
          <HashLink to="/#search-section">
            <GoChevronDown className="homepage-arrow" />
          </HashLink>
        </div>
      </div>
      <div id="search-section"></div>
      <div className="home-cont-pink">
        <h2 className="section-title-pink">You ask, they translate.</h2>
        <div className="home-flags-cont">
          <CircleFlag countryCode="de" height="40" />
          <CircleFlag countryCode="fr" height="40" />
          <CircleFlag countryCode="es" height="40" />
          <CircleFlag countryCode="at" height="40" />
          <CircleFlag countryCode="it" height="40" />
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
        <div className="flex-row">
          <div className="cardOuterDiv">
            <Link to="/categories/emailp" className="categoriesDiv">
              <div className="cat-container">
                <img src={cat4} className="categoriesPic" alt="Email Reviews" />
                <p>Email Reviews</p>
              </div>
            </Link>
          </div>
          <div className="cardOuterDiv">
            <Link to="/categories/phonep" className="categoriesDiv">
              <div className="cat-container">
                <img src={cat5} className="categoriesPic" alt="Phone Calls" />
                <p>Phone Calls</p>
              </div>
            </Link>
          </div>
          <div className="cardOuterDiv">
            <Link to="/categories/flatp" className="categoriesDiv">
              <div className="cat-container">
                <img src={cat1} className="categoriesPic" alt="Flat Viewings" />
                <p>Flat Viewings</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex-row">
          <div className="cardOuterDiv">
            <Link to="/categories/appointmentsp" className="categoriesDiv">
              <div className="cat-container">
                {" "}
                <img src={cat3} className="categoriesPic" alt="Appointments" />
              </div>
              <p>Appointments</p>
            </Link>
          </div>
          <div className="cardOuterDiv">
            <Link to="/categories/servicep" className="categoriesDiv">
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
            <Link to="/categories/interviewp" className="categoriesDiv">
              <div className="cat-container">
                <img src={cat7} className="categoriesPic" alt="Job Search" />
                <p>Interview practice</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
