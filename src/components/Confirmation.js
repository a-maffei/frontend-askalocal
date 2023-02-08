import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Confirmation.css";
import maestro from "./pics/maestro.png";
import mastercard from "./pics/mastercard.png";
import paypal from "./pics/paypal.png";
import visa from "./pics/visa.png";
import axios from "axios";
import cat from "./categories.json";
import Starrating from "./Starrating";

export default function Confirmation({
  localDisplay,
  setLocalDisplay,
  setPayment,
  user,
}) {
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [starError, setStarError] = useState(null);

  const url = `http://localhost:8080/local/${localDisplay._id}`;

  /* const [chosenLocal, setChosenLocal] = useState([]);
  const [error, setError] = useState(null);

  const url2 = `http://localhost:8080/local/${id}`;

  console.log(user);

  let keys = [];

  const fetchData = async (url) => {
    try {
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("result", result);
      setChosenLocal(result.data.local);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(url2);
  }, []); */

  console.log(localDisplay);

  const handleCheckout = () => {
    alert(
      "Payment isn't really available at this stage. Thank you for making it this far into our project!"
    );
  };

  let keys = null;

  const [currentPrice, setCurrentPrice] = useState(0);
  console.log(currentPrice);

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
      .post(
        url + "/review",
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
  };

  return (
    <>
      {localDisplay && (
        <div className="confirmation-cont">
          {" "}
          <h3 className="greeting-title-book">Booking</h3>
          <h4 className="greeting-subtitle-book">
            Are ready to receive some language support from{" "}
            {localDisplay?.firstname}? <br></br>
            Here you can finalize your booking 🚀
          </h4>
          <div className="recap-table">
            <div className="recap-table-title">
              <h3>Confirm the support you need</h3>
            </div>
            <div className="recap-table-total">
              {
                ((keys = Object.keys(localDisplay?.categories)),
                localDisplay.categories &&
                  keys?.map((element, i) =>
                    localDisplay.categories[element].textfield.length > 5 ? (
                      <div key={i}>
                        <input
                          type="radio"
                          name="services"
                          id={cat[element]}
                          onChange={(e) =>
                            setCurrentPrice(
                              localDisplay.categories[element].price
                            )
                          }
                          value={currentPrice}
                        />
                        <label htmlFor={cat[element]}>
                          {" "}
                          <h3 className="textstart ">
                            {cat[element]}{" "}
                            <p className="textend">
                              {localDisplay.categories[element].price} €
                            </p>
                          </h3>
                        </label>
                      </div>
                    ) : (
                      ""
                    )
                  ))
              }
            </div>

            {/*             <div className="offers">
              {console.log("what is happening", chosenLocal)(
                (keys = Object?.keys(chosenLocal?.categories)), //
                chosenLocal?.categories &&
                  keys?.map((element, i) =>
                    chosenLocal?.categories[element].textfield.length > 5 ? (
                      <div key={i} className="offersInnerDiv">
                        <div className="offer-type">
                          <h3 className="textstart ">{cat[element]}</h3>
                        </div>
                        <div className="offer-textfield">
                          <p className="textstart ">
                            {chosenLocal?.categories[element].textfield}
                          </p>
                        </div>
                        <p className="textend">
                          {chosenLocal?.categories[element].price} €
                        </p>
                      </div>
                    ) : (
                      ""
                    )
                  )
              )}
            </div> */}

            {/*           <div className="offers">
            {
              ((keys = Object.keys(chosenLocal?.categories)),
              chosenLocal.categories &&
                keys?.map((element, i) =>
                  chosenLocal.categories[element].textfield.length > 5 ? (
                    <div key={i} className="offersInnerDiv">
                      <div className="offer-type">
                        <h3 className="textstart ">{cat[element]}</h3>
                      </div>
                      <p className="textend">
                        {chosenLocal.categories[element].price} €
                      </p>
                    </div>
                  ) : (
                    ""
                  )
                ))
            }
          </div> */}
          </div>
          <div className="booking-cont">
            <div className="recap-table">
              <div className="recap-table-title">
                <h3>Price and payment</h3>
              </div>
              <div className="recap-table-total">
                <div className="payment-row">
                  <p>Service:</p>
                  <p>{currentPrice}</p>
                </div>
                <div className="payment-row">
                  <p>Ask A Local fee:</p>
                  <p>
                    <i>included</i>
                  </p>
                </div>
                <div className="payment-row">
                  <p>Total:</p>
                  <p>
                    <b>{currentPrice}</b>
                  </p>
                </div>
                <h4>We accept</h4>
                <div className="payment-method-inner">
                  <img src={visa} alt="visa" className="method" />
                  <img src={mastercard} alt="mastercard" className="method" />
                  <img src={maestro} alt="maestro" className="method" />
                  <img src={paypal} alt="paypal" className="method" />
                </div>
                <div className="checkout-bttn" onClick={handleCheckout}>
                  Proceed to checkout ➡{" "}
                </div>
              </div>
            </div>
          </div>
          {
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
          }
          <button
            className="purple-bttn"
            onClick={() => setPayment(false)}
          >{`Go back to ${localDisplay.firstname}'s Profile`}</button>
        </div>
      )}
    </>
  );
}
