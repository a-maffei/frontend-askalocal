import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";

export default function Conversation({
  conversation,
  currentUser,
  setNotMyId,
}) {
  const [users, setUsers] = useState(null);

  // console.log("CURREN>T USER", currentUser);

  useEffect(() => {
    const friendId = conversation?.members?.find((m) => m !== currentUser?.id);
    setNotMyId(friendId);
    //console.log("FRIEND ID", friendId);

    const getUser = async () => {
      try {
        //make a ternary that fetched either from local or from user based on the current user
        const res = await fetch(
          currentUser.isLocal
            ? `http://localhost:8080/user/user/${friendId}`
            : `http://localhost:8080/local/local/${friendId}`
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

  // console.log("USERRRR", users);
  return (
    <div className="conversation">
      <img className="conversationImg" src={users?.user?.pic} alt="" />

      <span className="conversationName">{users?.user?.firstname}</span>
    </div>
  );
}
