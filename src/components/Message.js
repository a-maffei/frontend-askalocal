import "./Message.css";
import { format } from "timeago.js";
import { useState, useEffect } from "react";

export default function Message({ message, own, user, local, notMyId }) {
  const [otherPerson, setOtherPerson] = useState({});
  console.log("NICHT MY ID", notMyId);
  console.log("/(/&/&//()&/", otherPerson);
  useEffect(() => {
    const getOtherPerson = async () => {
      const res = await fetch(`http://localhost:8080/user/${notMyId}`);
      const data = await res.json();
      setOtherPerson(data);
    };
    getOtherPerson();
  }, []);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own ? (local ? local.pic : user.pic) : otherPerson?.user?.pic}
          alt=""
        />
        <p className="messageText">{message?.text}</p>
      </div>
      <div className="messageBottom">{format(message?.createdAt)}</div>
    </div>
  );
}
