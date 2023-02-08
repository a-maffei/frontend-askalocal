import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LocalInfo.css";
import Starrating from "./Starrating";
import cat from "./categories.json";

export default function Profile({ local, user, setPayment }) {
  let keys = null;

  return (
    <div className="localDetailDiv">
      <div className="first-section">
        <div
          id="avatarBig"
          style={{
            backgroundImage: `url(${local.pic}`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="bioInfo">
          <h1>
            {local?.firstname} {local?.lastname.charAt(0)}.
          </h1>
          <p>
            Local in: <b>{local?.city}</b>
          </p>
          <p>
            <i className="breaktext">{local?.bio}</i>
          </p>
        </div>
      </div>
      <div className="offers">
        {
          ((keys = Object.keys(local?.categories)),
          local.categories &&
            keys?.map((element, i) =>
              local.categories[element].textfield.length > 5 ? (
                <div key={i} className="offersInnerDiv">
                  <div className="offer-type">
                    <h3 className="textstart ">{cat[element]}</h3>
                  </div>
                  <div className="offer-textfield">
                    <p className="textstart breaktext">
                      {local.categories[element].textfield}
                    </p>
                  </div>
                  <p className="textend">{local.categories[element].price} €</p>
                </div>
              ) : (
                ""
              )
            ))
        }
      </div>
      {local.ratings?.length > 0 ? (
        <div className="review">
          <div>
            <h2 className="addStar">
              Rating{" "}
              {Math.round(
                (local.ratings?.reduce((a, b) => a + b, 0) /
                  local.ratings?.length) *
                  10
              ) / 10}{" "}
            </h2>
          </div>
          <div className="starsList">
            {local.reviews?.map((review, index) => (
              <div className="starsListDiv" key={index}>
                <p className="textstart reviewer">{review[0]}</p>
                <p className="textstart reviewText">{review[1]}</p>
                <div className="reviewStar">
                  <Starrating
                    rating={local.ratings[index]}
                    total={5}
                    reactive={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      {/* NEEDS UPDATING Button going to general messages if you're a local and
      contacting the local if you're user */}
      <div className="purple-bttn-cont">
        {user ? (
          <button
            className="purple-bttn"
            onClick={() => setPayment(true)}
          >{`Confirm booking with ${local.firstname}`}</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

{
  /*  {local.reviews?.length > 0 ? (
   ) : (
           ""
         )} */
}
