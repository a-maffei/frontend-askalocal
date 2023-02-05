import Conversation from "./Conversation";
import "./Messenger.css";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import { useEffect, useState } from "react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { useJwt } from "react-jwt";

export default function Messenger({ user, local }) {
  const [conversations, setConversations] = useState([]);
  console.log("USER", user);

  const token = user?.token;

  const { decodedToken, isExpired } = useJwt(token);

  console.log("DECODED TOKEN", decodedToken);

  useEffect(() => {
    const getConversations = async () => {
      try {
        console.log("HOLA");
        const res = await axios.get(
          "http://localhost:8080/conversations/" + decodedToken?.id
        );
        console.log("RESSSSSSSSSSSSSSSSSSS", res);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [decodedToken?.id]);

  console.log("CONVO", conversations);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Serach for friends" className="chatMenuInput" />
          {conversations?.map((c) => (
            <Conversation conversation={c} currentUser={decodedToken} />
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message />
            <Message own={true} />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
          </div>

          <div className="chatBoxBottom"></div>
          <textarea
            className="chatMessageInput"
            placeholder="write something..."
          ></textarea>
          <button className="chatSubmitButton">Send</button>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline />
        </div>
      </div>
    </div>
  );
}
