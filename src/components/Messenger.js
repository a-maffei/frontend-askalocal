import Conversation from "./Conversation";
import "./Messenger.css";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { useJwt } from "react-jwt";
import { io } from "socket.io-client";

export default function Messenger({ user, local }) {
  const [conversations, setConversations] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [notMyId, setNotMyId] = useState("");
  const socket = useRef(io("ws://localhost:8900"));
  const scrollRef = useRef(null);
  const [userz, setUserz] = useState(null);

  const token = user ? user?.token : local?.token;
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", decodedToken?.id);
    socket.current.on("getUsers", (users) => {});
  }, [decodedToken?.id]);

  useEffect(() => {
    user ? setCurrentUser(user) : setCurrentUser(local);
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/conversations/${decodedToken?.id}`
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [decodedToken?.id]);

  useEffect(() => {
    //console.log("INSIDE EFFECT", currentChat?.id);
    // const id = currentChat?._id;
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat?._id]);

  function handleClick(c) {
    setCurrentChat(c);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: decodedToken?.id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== decodedToken?.id
    );
    socket.current.emit("sendMessage", {
      senderId: decodedToken?.id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("http://localhost:8080/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleChange(e) {
    setNewMessage(e.target.value);
  }

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          {conversations?.map((c) => (
            <div onClick={() => handleClick(c)}>
              <Conversation
                conversation={c}
                currentUser={decodedToken}
                setNotMyId={setNotMyId}
                userz={userz}
                setUserz={setUserz}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {[...messages].map((m) => (
                  <div ref={scrollRef}>
                    <Message
                      user={user}
                      local={local}
                      message={m}
                      own={m.sender === decodedToken?.id}
                      notMyId={notMyId}
                      userz={userz}
                    />
                  </div>
                ))}
              </div>

              <div className="chatBoxBottom"></div>
              <textarea
                className="chatMessageInput"
                placeholder="write something..."
                onChange={(e) => handleChange(e)}
                value={newMessage}
              ></textarea>
              <button className="chatSubmitButton" onClick={handleSubmit}>
                Send
              </button>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
