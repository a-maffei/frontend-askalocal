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
      setCityPosts(null);
      return;
    }
    let postList = posts?.locals.filter((el) => el.city === city);
    setCityPosts(postList);
    console.log("postlist", postList);
  };

  return (
    <div className="home">
      <div className="homeDiv">
        <Searchbar
          options={options}
          searchedPosts={searchedPosts}
          setSearchedPosts={setSearchedPosts}
          input={input}
          setInput={setInput}
          filterFunction={filterCities}
        />
      </div>
      {posts ? (
        <>
          <PostDisplay
            posts={cityPosts ? cityPosts : posts.locals}
            category={category}
            size={"big"}
            link={"all"}
          />
        </>
      ) : (
        []
      )}
    </div>
  );
};

export default Categories;