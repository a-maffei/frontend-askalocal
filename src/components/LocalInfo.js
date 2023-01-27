import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LocalInfo.css";

export default function LocalInfo() {
  // const { id } = useParams()
  const { id } = useParams();
  const [local, setLocal] = useState([]);
  let keys = null;
  const navigate = useNavigate();

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
    <div className="home">
      {local.categories ? (
        <div className="localDetailDiv">
          <h1>
            {local.firstname} {local.lastname.charAt(0)}.
          </h1>
          <div className="first-section">
            <img
              src={local.pic}
              className="avatarBig"
              alt={`${local.firstname}s Picture`}
            />
            <div className="bio">
              <p>{local.bio}</p>
            </div>
          </div>

          <h2>{local.firstname} Offers:</h2>
          <div className="offers">
            {
              ((keys = Object.keys(local?.categories)),
              local.categories &&
                keys?.map((element, i) => (
                  <div key={i} className="offersInnerDiv">
                    <h3 className="textstart">
                      {local.categories[element].category}
                    </h3>
                    <p className="textstart">
                      {local.categories[element].textfield}
                    </p>
                    <p className="textend">
                      {local.categories[element].price} €
                    </p>
                  </div>
                )))
            }
          </div>

          <div className="contact-button">
            <Link to="/signup" state="gi" className="navLinks">
              {`Contact ${local.firstname}`}
            </Link>
          </div>
          <button onClick={() => navigate(-1)} className="navLinks topMargin">
            Back
          </button>
        </div>
      ) : (
        []
      )}
    </div>
  );
}
