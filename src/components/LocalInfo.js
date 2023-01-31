import React, { useState, useEffect } from "react";
import axios from "axios";

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

          {/* {
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
            } */}
          <div className="offers">
            {local.categories.appointmentP.textfield && (
              <div className="offersInnerDiv">
                <h3 className="textstart">
                  {local.categories.appointmentP.category}
                </h3>
                <p className="textstart">
                  {local.categories.appointmentP.textfield}
                </p>
                <p className="textend">
                  {local.categories.appointmentP.price} €
                </p>
              </div>
            )}
            {local.categories.callP.textfield && (
              <div className="offersInnerDiv">
                <h3 className="textstart">{local.categories.callP.category}</h3>
                <p className="textstart">{local.categories.callP.textfield}</p>
                <p className="textend">{local.categories.callP.price} €</p>
              </div>
            )}
            {local.categories.emailP.textfield && (
              <div className="offersInnerDiv">
                <h3 className="textstart">
                  {local.categories.emailP.category}
                </h3>
                <p className="textstart">{local.categories.emailP.textfield}</p>
                <p className="textend">{local.categories.emailP.price} €</p>
              </div>
            )}
            {local.categories.flatP.textfield && (
              <div className="offersInnerDiv">
                <h3 className="textstart">{local.categories.flatP.category}</h3>
                <p className="textstart">{local.categories.flatP.textfield}</p>
                <p className="textend">{local.categories.flatP.price} €</p>
              </div>
            )}
            {local.categories.interviewP.textfield && (
              <div className="offersInnerDiv">
                <h3 className="textstart">
                  {local.categories.interviewP.category}
                </h3>
                <p className="textstart">
                  {local.categories.interviewP.textfield}
                </p>
                <p className="textend">{local.categories.interviewP.price} €</p>
              </div>
            )}
            {local.categories.serviceP.textfield && (
              <div className="offersInnerDiv">
                <h3 className="textstart">
                  {local.categories.serviceP.category}
                </h3>
                <p className="textstart">
                  {local.categories.serviceP.textfield}
                </p>
                <p className="textend">{local.categories.serviceP.price} €</p>
              </div>
            )}
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
