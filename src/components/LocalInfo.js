import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Localinfo.css";

export default function LocalInfo() {
  // const { id } = useParams()
  const { id } = useParams();
  const [local, setLocal] = useState([]);
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);

  const url = `http://localhost:8080/local/${id}`;

  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/local/${id}`);
      setLocal(result.data.local);
    } catch (err) {
      setError(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(url, {
        review,
      })
      .then((res) => {
        setLocal({ ...local, reviews: [...local.reviews, review] });
        setReview("");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const oneLocal = local.find((local) => local._id === id)

  // console.log(oneLocal)

  return local ? (
    <div>
      <h1>Local Info</h1>
      <div className="first-section">
        <img src={local?.pic} style={{ width: "200px" }} />
        <div>
          <h2>{local?.firstname}</h2>
          <p>{local?.bio}</p>
        </div>
      </div>
      <h2>{local?.firstname} Offers:</h2>
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
      <div className="reviews">
        <h2>Reviews</h2>
      </div>
      <div className="review">
        <ul>
          {local.reviews?.map((review, index) => (
            <li key={index}>
              user name
              <br />
              {review}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="reviews">
          <label>
            Leave a review:
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="contact-button">
        <button>Contact a Local</button>
      </div>
      ;
    </div>
  ) : (
    "Loading"
  );
}
