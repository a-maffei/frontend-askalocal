import React from "react";
import { SocialIcon } from "react-social-icons";
import alessandra from "./pics/alessandra.jpeg";
import timon from "./pics/timon.jpeg";
import antonio from "./pics/antonio.jpeg";
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
              bgColor="var(--accent)"
            />
            <SocialIcon
              network="github"
              style={{ height: 30, width: 30 }}
              url="https://github.com/a-maffei"
              bgColor="var(--accent)"
            />
          </div>
        </div>
        <div className="us-individual-container">
          <img className="us-pic" src={antonio}></img>
          <h5 className="us-name paragraph-title-green">Antonio</h5>
          <h6 className="us-city paragraph-title-green">Stuttgart</h6>
          <div className="us-social">
            <SocialIcon
              network="linkedin"
              style={{ height: 30, width: 30 }}
              url="https://www.linkedin.com/in/antonio-macan-51bb91207/"
              bgColor="var(--accent)"
            />
            <SocialIcon
              network="github"
              style={{ height: 30, width: 30 }}
              url="https://github.com/Macanijus"
              bgColor="var(--accent)"
            />
          </div>
        </div>
        <div className="us-individual-container">
          <img className="us-pic" src={timon}></img>
          <h5 className="us-name paragraph-title-green">Timon</h5>
          <h6 className="us-city paragraph-title-green">Berlin</h6>
          <div className="us-social">
            <SocialIcon
              network="linkedin"
              style={{ height: 30, width: 30 }}
              url="https://www.linkedin.com/in/timonschell/"
              bgColor="var(--accent)"
            />
            <SocialIcon
              network="github"
              style={{ height: 30, width: 30 }}
              url="https://github.com/Apollosport"
              bgColor="var(--accent)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
