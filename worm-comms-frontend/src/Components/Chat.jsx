import React from "react";

const Chat = ({ chat, setCurrentChat, currentChatId }) => {
  const handleChatClick = () => {
    setCurrentChat(chat);
    console.log(currentChatId)
  };

  const isSelected = chat.id === currentChatId;

  return (
    <li key={chat.id} onClick={handleChatClick} className={`cursor-pointer mt-1 ${isSelected ? "font-bold" : ""}`}>
      {chat.name + ' - id: ' + chat.id} 
    </li>
  );
};

export default Chat;
