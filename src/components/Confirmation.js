import React from "react";
import "./Confirmation.css";
import maestro from "./pics/maestro.png";
import mastercard from "./pics/mastercard.png";
import paypal from "./pics/paypal.png";
import visa from "./pics/visa.png";

export default function Confirmation() {
  /*   const [review, setReview] = useState("");
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [starError, setStarError] = useState(null); */

  const handleCheckout = () => {
    alert(
      "Payment isn't really available at this stage. Thank you for making it this far into our project!"
    );
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

  return (
    <div className="confirmation-cont">
      {" "}
      <h3 className="greeting-title">Booking</h3>
      <h4 className="greeting-subtitle">
        Have you agreed on all details and are ready to receive some language
        support? <br></br>
        Send us your payment to finalize the booking 🚀
      </h4>
      <div className="booking-cont">
        <div className="recap-table">
          <div className="recap-table-title">
            <h3>Summary</h3>
          </div>
          <div className="recap-table-total">
            <div className="payment-row">
              <p>Service:</p>
              <p>15 €</p>
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
                <b>15 €</b>
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
      {/* <div>
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
