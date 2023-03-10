import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./Profile";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LocalInfo.css";
import Starrating from "./Starrating";
import Confirmation from "./Confirmation";

export default function LocalInfo({ local, user }) {
  // To create a conversation, we need the ID of the currently logged in person and the chosen local.
  // The ID of the chosen local we can get from here.
  // Lines 82 to 84 redirect us to the messenger. The messenger will need both these IDs to start up the convo
  // The function to take in the 2 IDs and create the chat still has to be implemented

  const { id } = useParams();
  const [localDisplay, setLocalDisplay] = useState([]);
  const [error, setError] = useState(null);
  const [payment, setPayment] = useState(false);
  /* const [review, setReview] = useState("");
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [starError, setStarError] = useState(null); */
  let keys = null;
  const navigate = useNavigate();

  console.log(local);

  const url = `https://backend-askalocal.onrender.com/local/${id}`;
  const url2 = `http://localhost:8080/local/${id}`;

  const fetchData = async (url) => {
    try {
      const result = await axios.get(url, {
        headers: {
          Authorization: user
            ? `Bearer ${user.token}`
            : `Bearer ${local.token}`,
        },
      });
      setLocalDisplay(result.data.local);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  /* const handleSubmit = (e) => {
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
      .post(
        url2 + "/review",
        {
          review: [`${user.firstname} ${user.lastname.charAt(0)}.`, review],
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setLocalDisplay({
          ...localDisplay,
          reviews: [
            ...localDisplay.reviews,
            [`${user.firstname} ${user.lastname.charAt(0)}.`, review],
          ],
          ratings: [...localDisplay.ratings, rating],
        });
        setReview("");
        setRating(0);
      })
      .catch((err) => console.error(err));
  }; */

  useEffect(() => {
    fetchData(url);
  }, []);

  // const oneLocal = local.find((local) => local._id === id)

  console.log("HERE", local);

  return (
    <div className="localDiv">
      {localDisplay.categories ? (
        <>
          {payment ? (
            <Confirmation
              setLocalDisplay={setLocalDisplay}
              localDisplay={localDisplay}
              setPayment={setPayment}
              user={user}
            />
          ) : (
            <>
              <Profile
                local={localDisplay}
                user={user}
                setPayment={setPayment}
              />
              <button onClick={() => navigate(-1)} className="bright-bttn">
                Back
              </button>
            </>
          )}
        </>
      ) : (
        ""
      )}
      {/* LEAVE A
      
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
      </div> */}
    </div>
  );
}
