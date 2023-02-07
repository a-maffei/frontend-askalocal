import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LocalInfo.css";
import Starrating from "./Starrating";
import cat from "./categories.json";

export default function Profile({ local }) {
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
            <i>{local?.bio}</i>
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
                    <p className="textstart ">
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
      <div className="purple-bttn-cont">
        <Link to={`/${local._id}/contact`} state="gi">
          <button className="purple-bttn">{`Contact ${local.firstname}`}</button>
        </Link>
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
