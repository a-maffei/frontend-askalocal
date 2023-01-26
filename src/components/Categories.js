import React from "react";
import PostDisplay from "./PostDisplay";
import Searchbar from "./Searchbar";
import { useEffect, useState } from "react";

const Categories = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
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
      <option value="" className="green">
        City
      </option>
      <option value="Barcelona">Barcelona</option>
      <option value="Berlin">Berlin</option>
      <option value="Vienna">Vienna</option>
      <option value="Paris">Paris</option>
      <option value="Rom">Rom</option>
    </>
  );

  return (
    <div className="home">
      <div className="homeDiv">
        <Searchbar options={options} />
        {posts ? (
          <div>
            <PostDisplay posts={posts.locals} category={"appointmentP"} />
            <PostDisplay posts={posts.locals} category={"serviceP"} />
            <PostDisplay posts={posts.locals} category={"interviewP"} />
            <PostDisplay posts={posts.locals} category={"flatP"} />
            <PostDisplay posts={posts.locals} category={"callP"} />
            <PostDisplay posts={posts.locals} category={"emailP"} />
          </div>
        ) : (
          []
        )}
      </div>
    </div>
  );
};

export default Categories;
