import React from "react";

const Chat = ({ chat, setCurrentChat, currentChatId }) => {
  const handleChatClick = () => {
    setCurrentChat(chat);
  };

  const isSelected = chat.id === currentChatId;

  return (
    <li key={chat.id} onClick={handleChatClick} className={`cursor-pointer mt-1 rounded-xl pl-5 ${isSelected ? "font-bold bg-slate-200 shadow-lg" : ""}`}>
      {chat.name + ' - id: ' + chat.id} 
    </li>
  );
};

export default Chat;
