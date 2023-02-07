import React from "react";
import "./Confirmation.css";
import maestro from "./pics/maestro.png";
import mastercard from "./pics/mastercard.png";
import paypal from "./pics/paypal.png";
import visa from "./pics/visa.png";

export default function Confirmation() {
  const handleCheckout = () => {
    alert(
      "Payment isn't really available at this stage. Thank you for making it this far into our project!"
    );
  };

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
    </div>
  );
}
