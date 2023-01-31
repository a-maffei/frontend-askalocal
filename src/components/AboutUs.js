import React from "react";
import { SocialIcon } from "react-social-icons";
import alessandra from "./pics/alessandra.jpg";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div>
      <div className="us-container">
        <div className="us-individual-container">
          <img className="us-pic" src={alessandra}></img>
          <h5 className="us-name">Alessandra</h5>
          <h6 className="us-city">Berlin</h6>
          <div className="us-social">
            <SocialIcon
              network="linkedin"
              style={{ height: 40, width: 40 }}
              url="https://www.linkedin.com/in/alessandramaffei/"
              bgColor="#e8c0e8"
            />
            <SocialIcon
              network="github"
              style={{ height: 40, width: 40 }}
              url="https://github.com/a-maffei"
              bgColor="#e8c0e8"
            />
          </div>
        </div>
        <div className="us-individual-container">
          <img className="us-pic" src={alessandra}></img>
          <h5 className="us-name">Antonio</h5>
          <h6 className="us-city">?</h6>
          <div className="us-social">
            <SocialIcon
              network="linkedin"
              style={{ height: 40, width: 40 }}
              url=""
              bgColor="#e8c0e8"
            />
            <SocialIcon
              network="github"
              style={{ height: 40, width: 40 }}
              url=""
              bgColor="#e8c0e8"
            />
          </div>
        </div>
        <div className="us-individual-container">
          <img className="us-pic" src={alessandra}></img>
          <h5 className="us-name">Timon</h5>
          <h6 className="us-city">Berlin</h6>
          <div className="us-social">
            <SocialIcon
              network="linkedin"
              style={{ height: 40, width: 40 }}
              url=""
              bgColor="#e8c0e8"
            />
            <SocialIcon
              network="github"
              style={{ height: 40, width: 40 }}
              url=""
              bgColor="#e8c0e8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
