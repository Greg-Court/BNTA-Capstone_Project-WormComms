import React from "react";
import Message from "./Message";
import { useEffect, useRef } from "react";
import { useCurrentChat } from "../ChatContext";
import { useCurrentUser } from "../UserContext";
import { generateAutoReplyResponse } from "../../autoReply";

const Messages = ({ messages, setMessages }) => {
  const { currentChat, setCurrentChat } = useCurrentChat();
  const { currentUser } = useCurrentUser();

  const messagesEndRef = useRef(null);

  console.log(JSON.stringify(messages));

  useEffect(() => {
    if (currentChat != null) {
      setMessages(currentChat.messages);
    }
  }, [currentChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="overflow-y-auto flex flex-col h-full">
      <ul className="flex-grow flex flex-col justify-end">
        {messages?.map((message, index) => (
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
