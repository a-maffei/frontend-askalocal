import React from "react";
import { SocialIcon } from "react-social-icons";
import alessandra from "./pics/alessandra.jpeg";
import timon from "./pics/timon.jpeg";
import antonio from "./pics/antonio.jpeg";
import "./AboutUs.css";
import { Link } from "react-router-dom";

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
              style={{ height: 30, width: 30 }}
              url="https://www.linkedin.com/in/alessandramaffei/"
              bgColor="var(--accent)"
              target="_blank"
            />

            <SocialIcon
              network="github"
              style={{ height: 30, width: 30 }}
              url="https://github.com/a-maffei"
              bgColor="var(--accent)"
              target="_blank"
            />
          </div>
        </div>
        <div className="us-individual-container">
          <img className="us-pic" src={antonio}></img>
          <h5 className="us-name">Antonio</h5>
          <h6 className="us-city">Stuttgart</h6>
          <div className="us-social">
            <SocialIcon
              network="linkedin"
              style={{ height: 30, width: 30 }}
              url="https://www.linkedin.com/in/antonio-macan-51bb91207/"
              bgColor="var(--accent)"
              target="_blank"
            />
            <SocialIcon
              network="github"
              style={{ height: 30, width: 30 }}
              url="https://github.com/Macanijus"
              bgColor="var(--accent)"
              target="_blank"
            />
          </div>
        </div>
        <div className="us-individual-container">
          <img className="us-pic" src={timon}></img>
          <h5 className="us-name">Timon</h5>
          <h6 className="us-city">Berlin</h6>
          <div className="us-social">
            <SocialIcon
              network="linkedin"
              style={{ height: 30, width: 30 }}
              url="https://www.linkedin.com/in/timonschell/"
              bgColor="var(--accent)"
              target="_blank"
            />
            <SocialIcon
              network="github"
              style={{ height: 30, width: 30 }}
              url="https://github.com/Apollosport"
              bgColor="var(--accent)"
              target="_blank"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
