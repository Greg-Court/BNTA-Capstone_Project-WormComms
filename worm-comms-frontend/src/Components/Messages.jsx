import React from "react";
import Message from "./Message";

const Messages = ({ messages }) => {
  return (
    <ul>
      {messages.map((message, index) => (
        <Message message={message} key={index}></Message>
      ))}
    </ul>
  );
};

export default Messages;