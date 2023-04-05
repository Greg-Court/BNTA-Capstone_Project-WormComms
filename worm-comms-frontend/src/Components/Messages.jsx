import React, { useState } from "react";
import Message from "./Message";
import { useEffect, useRef } from "react";
import { useCurrentChat } from "../ChatContext";
import { useCurrentUser } from "../UserContext";

const Messages = () => {
  const { currentChat, setCurrentChat } = useCurrentChat();
  const { currentUser, setCurrentUser } = useCurrentUser();

  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const updateMessages = () =>{
    setMessages(currentChat?.messages.map((message, index) => (
      <Message
        message={message}
        key={index}
        currentUser={currentUser}
        updateMessages={updateMessages}
      ></Message>
    )
    ));
  }

  useEffect(() => {
    console.log("refreshing messages")
    updateMessages();
  }, [currentChat])

  useEffect(() => {
    scrollToBottom();
  }, [currentChat,messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="overflow-y-auto flex flex-col h-full">
      <ul className="flex-grow flex flex-col justify-end">
        {messages}
      </ul>
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default Messages;
