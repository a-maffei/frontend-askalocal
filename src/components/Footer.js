import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <p className="footer-text">
        Thank you <a href="https://www.pexels.com/">Pexels</a> for the pictures,{" "}
        <a href="https://undraw.co/">UnDraw</a> for the illustrations, and{" "}
        <a href="https://iconscout.com/contributors/xinhstudio">IconScout</a>{" "}
        for the payment icons.
      </p>
    </div>
  );
}
