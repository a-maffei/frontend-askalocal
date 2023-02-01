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
          <h5 className="us-name paragraph-title-green">Alessandra</h5>
          <h6 className="us-city paragraph-title-green">Berlin</h6>
          <div className="us-social">
            <SocialIcon
              network="linkedin"
              style={{ height: 30, width: 30 }}
              url="https://www.linkedin.com/in/alessandramaffei/"
              bgColor="#e8c0e8"
            />
            <SocialIcon
              network="github"
              style={{ height: 30, width: 30 }}
              url="https://github.com/a-maffei"
              bgColor="#e8c0e8"
            />
          </div>
        </div>
        <div className="us-individual-container">
          <img className="us-pic" src={alessandra}></img>
          <h5 className="us-name paragraph-title-green">Antonio</h5>
          <h6 className="us-city paragraph-title-green">?</h6>
          <div className="us-social">
            <SocialIcon
              network="linkedin"
              style={{ height: 30, width: 30 }}
              url=""
              bgColor="#e8c0e8"
            />
            <SocialIcon
              network="github"
              style={{ height: 30, width: 30 }}
              url=""
              bgColor="#e8c0e8"
            />
          </div>
        </div>
        <div className="us-individual-container">
          <img className="us-pic" src={alessandra}></img>
          <h5 className="us-name paragraph-title-green">Timon</h5>
          <h6 className="us-city paragraph-title-green">Berlin</h6>
          <div className="us-social">
            <SocialIcon
              network="linkedin"
              style={{ height: 30, width: 30 }}
              url=""
              bgColor="#e8c0e8"
            />
            <SocialIcon
              network="github"
              style={{ height: 30, width: 30 }}
              url=""
              bgColor="#e8c0e8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
