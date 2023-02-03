import React from "react";

export default function Messenger({ user, local }) {
  console.log(user || local);
  return (
    <div className="messenger">
      <div className="chat-menu"></div>
      <div className="chat-box"></div>
      <div className="chat-online"></div>
    </div>
  );
}
