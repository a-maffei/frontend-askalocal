import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";

export default function Conversation({
  conversation,
  currentUser,
  setNotMyId,
  setUserz,
}) {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const friendId = conversation?.members?.find((m) => m !== currentUser?.id);
    setNotMyId(friendId);

    const getUser = async () => {
      try {
        //make a ternary that fetched either from local or from user based on the current user
        const res = await fetch(
          currentUser.isLocal
            ? `https://backend-askalocal.onrender.com/user/user/${friendId}`
            : `https://backend-askalocal.onrender.com/local/local/${friendId}`
        );
        const data = await res.json();
        setUsers(data);
        setUserz(data);
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
