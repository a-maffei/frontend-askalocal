import React from "react";
import PostDisplay from "./PostDisplay";
import Searchbar from "./Searchbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Categories = ({
  input,
  setInput,
  user,
  local,
  setSelectedValue,
  selectedValue,
}) => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [cityPosts, setCityPosts] = useState(null);
  const { category } = useParams();

  const url = `https://backend-askalocal.onrender.com/local`;
  const url2 = "http://localhost:8080/local";

  const getData = async (url) => {
    console.log("what is this now");
    const data = await fetch(url, {
      headers: {
        Authorization: user ? `Bearer ${user.token}` : `Bearer ${local.token}`,
      },
    })
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

  // useEffect(() => {
  //   filterCities(selectedValue);
  // }, [selectedValue]);

  // const filterCities = (city) => {
  //   if (city === "City") {
  //     setCityPosts(posts);
  //     return;
  //   }

  //   setCityPosts([...posts]?.filter((el) => el.city === city));
  // };

  return (
    <div className="categoriesBigDiv">
      <Searchbar
        searchedPosts={searchedPosts}
        setSearchedPosts={setSearchedPosts}
        input={input}
        setInput={setInput}
        // filterFunction={filterCities}
        setSelectedValue={setSelectedValue}
        selectedValue={selectedValue}
      />
      {(posts?.length && input?.length < 1) ||
      posts?.some((el) =>
        el.categories[category]?.textfield
          .toLowerCase()
          .includes(input.toLowerCase())
      ) ? (
        <PostDisplay
          posts={cityPosts}
          category={category}
          input={input}
          size={"big"}
          link={"all"}
          selectedValue={selectedValue}
        />
      ) : (
        <p>No Posts matching the criteria</p>
      )}
    </div>
  );
};

export default Categories;
