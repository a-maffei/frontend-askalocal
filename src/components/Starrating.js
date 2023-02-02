import React, { useState, useEffect } from "react";
import "./Starrating.css";

const Starrating = ({ rating, setRating, total, reactive }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="star-rating">
      {[...Array(total)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            {reactive ? (
              <>
                <input
                  type="radio"
                  name="rating"
                  className="ratingradio"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />

                <span
                  className="star"
                  onMouseOver={() => setHover(ratingValue)}
                  onMouseOut={() => setHover(null)}
                >
                  {ratingValue <= (hover || rating)
                    ? String.fromCharCode(9733)
                    : String.fromCharCode(9734)}
                </span>
              </>
            ) : (
              <span className="starInactive">
                {ratingValue <= rating
                  ? String.fromCharCode(9733)
                  : String.fromCharCode(9734)}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
};

export default Starrating;
