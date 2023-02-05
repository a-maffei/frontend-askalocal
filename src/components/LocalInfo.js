import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./Profile";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LocalInfo.css";
import Starrating from "./Starrating";

export default function LocalInfo({ user }) {
  // const { id } = useParams()
  const { id } = useParams();
  const [local, setLocal] = useState([]);
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [starError, setStarError] = useState(null);
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
    if (rating === 0) {
      setStarError("Please give a star rating");
      return;
    }
    if (review.length > 150) {
      setStarError(
        `Please type a maximum of 150 characters. You currently have ${review.length}`
      );
      return;
    }
    if (!user) {
      setStarError("Please login");
      return;
    }
    setStarError(null);

    axios
      .post(url2 + "/review", {
        review: [`${user.firstname} ${user.lastname.charAt(0)}.`, review],
        rating,
      })
      .then((res) => {
        setLocal({
          ...local,
          reviews: [
            ...local.reviews,
            [`${user.firstname} ${user.lastname.charAt(0)}.`, review],
          ],
          ratings: [...local.ratings, rating],
        });
        setReview("");
        setRating(0);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData(url2);
  }, []);

  // const oneLocal = local.find((local) => local._id === id)

  console.log("HERE", local);

  return (
    <div className="localDiv">
      {local.categories ? (
        <>
          <Profile local={local} />{" "}
          <button onClick={() => navigate(-1)} className="bright-bttn">
            Back
          </button>{" "}
        </>
      ) : (
        ""
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="reviews">
            <label>
              Leave a review:
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                minLength={5}
                maxLength={100}
              />
            </label>
            <Starrating
              rating={rating}
              setRating={setRating}
              total={5}
              reactive={true}
            />
            {starError ? (
              <p>
                <b>{starError}</b>
              </p>
            ) : (
              ""
            )}
            <button className="button-review" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
