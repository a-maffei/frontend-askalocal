import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function LocalInfo() {
  // const { id } = useParams()
  const { id } = useParams();
  const [local, setLocal] = useState([]);

  const fetchData = async () => {
    const result = await axios.get(
      `https://backend-askalocal.onrender.com/local/${id}`
    );
    setLocal(result.data.local);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const oneLocal = local.find((local) => local._id === id)

  return (
    <div>
      <h1>Local Info</h1>
      <div className="first-section">
        <img src={local.pic} style={{ width: "200px" }} />
        <div>
          <h2>{local.firstname}</h2>
          <p>{local.bio}</p>
        </div>
      </div>

      <h2>{local.firstname} Offers:</h2>

      <div className="offers">
        <h3>{local.categories?.emailP.category}</h3>
        <p>{local.categories?.emailP?.textfield}</p>
        <p>{local.categories?.emailP?.price} €</p>
      </div>

      <div className="offers">
        <h3>{local.categories?.interviewP?.category}</h3>
        <p>{local.categories?.interviewP?.textfield}</p>
        <p>{local.categories?.interviewP?.price} €</p>
      </div>

      <div className="offers">
        <h3>{local.categories?.appointmentP?.category}</h3>
        <p>{local.categories?.appointmentP?.textfield}</p>
        <p>{local.categories?.appointmentP?.price} €</p>
      </div>

      <div className="contact-button">
        <button>Contact a Local</button>
      </div>
    </div>
  );
}
