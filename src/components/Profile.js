import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LocalInfo.css";

export default function Profile({ local }) {
  console.log(local);

  return (
    <div className="localDetailDiv">
      {" "}
      <h1>
        {local?.firstname} {local?.lastname.charAt(0)}.
      </h1>
      <div className="first-section">
        <img
          src={local?.pic}
          className="avatarBig"
          alt={`${local?.firstname}s Picture`}
        />
        <div className="bio">
          <p>{local?.bio}</p>
        </div>
      </div>
      <h2>{local?.firstname} Offers:</h2>
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
        {local?.categories.appointmentP.textfield && (
          <div className="offersInnerDiv">
            <h3 className="textstart">
              {local?.categories.appointmentP.category}
            </h3>
            <p className="textstart">
              {local?.categories.appointmentP.textfield}
            </p>
            <p className="textend">{local?.categories.appointmentP.price} €</p>
          </div>
        )}
        {local?.categories.callP.textfield && (
          <div className="offersInnerDiv">
            <h3 className="textstart">{local?.categories.callP.category}</h3>
            <p className="textstart">{local?.categories.callP.textfield}</p>
            <p className="textend">{local?.categories.callP.price} €</p>
          </div>
        )}
        {local?.categories.emailP.textfield && (
          <div className="offersInnerDiv">
            <h3 className="textstart">{local?.categories.emailP.category}</h3>
            <p className="textstart">{local?.categories.emailP.textfield}</p>
            <p className="textend">{local?.categories.emailP.price} €</p>
          </div>
        )}
        {local?.categories.flatP.textfield && (
          <div className="offersInnerDiv">
            <h3 className="textstart">{local?.categories.flatP.category}</h3>
            <p className="textstart">{local?.categories.flatP.textfield}</p>
            <p className="textend">{local?.categories.flatP.price} €</p>
          </div>
        )}
        {local?.categories.interviewP.textfield && (
          <div className="offersInnerDiv">
            <h3 className="textstart">
              {local?.categories.interviewP.category}
            </h3>
            <p className="textstart">
              {local?.categories.interviewP.textfield}
            </p>
            <p className="textend">{local?.categories.interviewP.price} €</p>
          </div>
        )}
        {local?.categories.serviceP.textfield && (
          <div className="offersInnerDiv">
            <h3 className="textstart">{local?.categories.serviceP.category}</h3>
            <p className="textstart">{local?.categories.serviceP.textfield}</p>
            <p className="textend">{local?.categories.serviceP.price} €</p>
          </div>
        )}
      </div>
    </div>
  );
}
