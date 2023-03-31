import React from "react";
import Message from "./Message";
import { useEffect, useRef } from "react";
import { useCurrentChat } from "../ChatContext";
import { getChatById } from "../api";

const Messages = ({ messages, currentUser, setMessages }) => {

  const { currentChat, setCurrentChat } = useCurrentChat();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log(currentChat)
    console.log()
    if (currentChat != null) {
      setMessages(currentChat.messages);
    }
  }, [currentChat])

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-[2.5%] overflow-y-auto flex flex-col h-full">
      <ul className="flex-grow flex flex-col justify-end">
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
