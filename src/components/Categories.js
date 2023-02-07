import React from "react";
import PostDisplay from "./PostDisplay";
import Searchbar from "./Searchbar";
import { useEffect, useState } from "react";
import cat from "./categories.json";
import options from "./options.json";
import "./Categories.css";

const Categories = ({
  user,
  local,
  input,
  setInput,
  selectedValue,
  setSelectedValue,
}) => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [cityPosts, setCityPosts] = useState(null);
  const keys = Object.keys(cat);

  const url = `https://backend-askalocal.onrender.com/local`;
  const url2 = "http://localhost:8080/local";

  const getData = async (url) => {
    console.log(user, local);
    const data = await fetch(url, {
      headers: {
        Authorization: user ? `Bearer ${user.token}` : `Bearer ${local.token}`,
      },
    })
      .then((data) => data.json())
      .catch((e) => setError(e));
    if (data.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    setPosts(data.locals);
    setCityPosts(data.locals);
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
      {/* <div className="homeDiv"> */}
      <Searchbar
        searchedPosts={searchedPosts}
        setSearchedPosts={setSearchedPosts}
        input={input}
        setInput={setInput}
        // filterFunction={filterCities}
        setSelectedValue={setSelectedValue}
        selectedValue={selectedValue}
      />
      {/* </div> */}
      {cityPosts ? (
        <>
          {keys.map((element, i) => (
            <div key={i}>
              {/* {cityPosts.map(
                (el, j) => (
                    el.categories && el.categories[element]
                      ? Object.values(el.categories[element]).some((elem) =>
                          elem === null
                            ? false
                            : elem
                                .toString()
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        )
                      : false
                  ) ? ( */}
              {input?.length < 1 ||
              posts?.some((el) =>
                el.categories[element]?.textfield
                  .toLowerCase()
                  .includes(input.toLowerCase())
              ) ? (
                <PostDisplay
                  posts={posts}
                  category={element}
                  size={"small"}
                  input={input}
                  key={i}
                  selectedValue={selectedValue}
                />
              ) : (
                ""
              )}
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Categories;

// let postKeys = cityPosts ? Object.keys(cityPosts) : Object.keys(posts.locals);
// console.log("input", input);

// input.length > 0 &&
// posts[element].categories[category].textfield.contains(input) ?

// useEffect(() => {
//   console.log(
//     posts.some((element) =>
//       Object.values(element?.categories[category]).includes("trans")
//     )
//   );
// posts.locals.some(
//   (el) =>
//     -1 !==
//     Object.values(el.categories[element]).findIndex((elem) =>
//       elem.toString().toLowerCase().includes(input)
//     )
// cityPosts.length > 100 ? (
//   cityPosts.some((el) =>
//     Object.values(el.categories[element]).some((elem) =>
//       elem.toString().toLowerCase().includes(input)
//     )
//   )
// ) :
