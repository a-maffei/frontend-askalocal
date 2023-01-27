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

  const url = `http://localhost:8080/local/${id}/review`;

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

  return (
    <div>
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
          <button className="button-review" type="submit">
            Submit
          </button>
        </div>
      </form>
      <div className="button-contact">
        <button className="contact-button">Contact a Local</button>
      </div>
      ;
    </div>
  );
}
