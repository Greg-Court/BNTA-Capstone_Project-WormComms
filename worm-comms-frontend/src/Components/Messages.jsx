import React from "react";
import Message from "./Message";
import { useEffect, useRef } from "react";

const Messages = ({ messages, currentUser }) => {

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-[2.5%] overflow-y-auto">        
        <ul>
          {messages.map((message, index) => (
            <Message
              message={message}
              key={index}
              currentUser={currentUser}
            ></Message>
          ))}
        </ul>
        <div ref={messagesEndRef}></div>
    </div>

  );
};

export default Messages;
