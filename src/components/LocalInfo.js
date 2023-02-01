import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./Profile";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LocalInfo.css";

export default function LocalInfo() {
  // const { id } = useParams()
  const { id } = useParams();
  const [local, setLocal] = useState([]);
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);
  let keys = null;
  const navigate = useNavigate();

  const url = `https://backend-askalocal.onrender.com/local/${id}`;
  const url2 = `http://localhost:8080/local/${id}`;

  const fetchData = async (url) => {
    try {
      const result = await axios.get(url);
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
    fetchData(url2);
  }, []);

  // const oneLocal = local.find((local) => local._id === id)

  console.log("HERE", local);

  return (
    <div className="home">
      {local.categories ? (
        <>
          <Profile local={local} />{" "}
          <div className="contact-button">
            <Link to="/signup" state="gi" className="navLinks">
              {`Contact ${local.firstname}`}
            </Link>
          </div>
          <button onClick={() => navigate(-1)} className="navLinks topMargin">
            Back
          </button>{" "}
        </>
      ) : (
        ""
      )}
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
      </div>
    </div>
  );
}
