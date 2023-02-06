import React from "react";
import PostDisplay from "./PostDisplay";
import Searchbar from "./Searchbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Categories = ({ input, setInput }) => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [cityPosts, setCityPosts] = useState(null);
  const { category } = useParams();

  const url = `https://backend-askalocal.onrender.com/local`;
  const url2 = "http://localhost:8080/local";

  const getData = async (url) => {
    const data = await fetch(url)
      .then((data) => data.json())
      .catch((e) => console.log(e.message.value));
    if (data.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    setPosts(data.locals);
    setCityPosts(data.locals);
    console.log(data.locals);
  };

  useEffect(() => {
    getData(url2);
  }, []);

  const options = (
    <>
      <option value="City" className="options">
        City
      </option>
      <option value="Barcelona" className="options">
        Barcelona
      </option>
      <option value="Berlin" className="options">
        Berlin
      </option>
      <option value="Vienna" className="options">
        Vienna
      </option>
      <option value="Paris" className="options">
        Paris
      </option>
      <option value="Rom" className="options">
        Rom
      </option>
    </>
  );

  const filterCities = (city) => {
    if (city === "City") {
      setCityPosts(posts);
      return;
    }
    let postList = posts?.filter((el) => el.city === city);
    setCityPosts(postList);
    console.log("postlist", postList);
  };

  return (
    <div className="categoriesBigDiv">
      <Searchbar
        options={options}
        searchedPosts={searchedPosts}
        setSearchedPosts={setSearchedPosts}
        input={input}
        setInput={setInput}
        filterFunction={filterCities}
      />
      {cityPosts &&
      cityPosts?.some((el) =>
        el.categories && el.categories[category]
          ? Object.values(el.categories[category]).some((elem) =>
              elem === null
                ? false
                : elem.toString().toLowerCase().includes(input.toLowerCase())
            )
          : false
      ) ? (
        <>
          <PostDisplay
            posts={cityPosts ? cityPosts : posts}
            category={category}
            input={input}
            size={"big"}
            link={"all"}
          />
        </>
      ) : (
        <p>No Posts matching the criteria</p>
      )}
    </div>
  );
};

export default Categories;
