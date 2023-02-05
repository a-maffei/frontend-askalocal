import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const friendId = conversation?.members?.find((m) => m !== currentUser?.id);

    console.log("FRIEND ID", friendId);

    const getUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/local/local/${friendId}`
        );
        const data = await res.json();
        setUsers(data);
        console.log("DATA INSIDE FETCH", data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  console.log("USERRRR", users);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://images.pexels.com/photos/7752807/pexels-photo-7752807.jpeg?auto=compress&cs=tinysrgb&w=800"
        alt=""
      />

      <span className="conversationName">{users?.user?.firstname}</span>
    </div>
  );
}
