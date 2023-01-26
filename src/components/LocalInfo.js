import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function LocalInfo() {
  // const { id } = useParams()
  const { id } = useParams();
  const [local, setLocal] = useState([]);
  const url = `https://backend-askalocal.onrender.com/local/${id}`;
  const url2 = `http://localhost:8080/local/${id}`;

  console.log("bamm ", id);

  const fetchData = async () => {
    console.log("test", id);
    const result = await axios.get(url);
    setLocal(result.data.local);
    console.log(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const oneLocal = local.find((local) => local._id === id)

  console.log(id);

  return (
    <div>
      <h1>Local Info</h1>
      <img src={local?.pic} style={{ width: "200px" }} />
      <h2>{local?.firstname}</h2>
      <p>{local?.bio}</p>
    </div>
  );
}
