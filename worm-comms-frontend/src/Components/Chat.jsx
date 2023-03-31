import React from "react";
import { getChatById } from "../api";
import { useCurrentChat } from "../ChatContext";

const Chat = ({ chat }) => {

  const {currentChat,setCurrentChat} = useCurrentChat();
  
  const handleChatClick = async () => {
    //get current chat from the backend
    const newUpdatedChat = await getChatById(chat.id);
    setCurrentChat(newUpdatedChat.data);
    console.log(currentChat)
  };

  const isSelected = chat.id === currentChat?.id;

  return (
    <li key={chat.id} onClick={handleChatClick} className={`cursor-pointer mt-1 rounded-xl pl-5 ${isSelected ? "font-bold bg-slate-200 shadow-lg" : ""}`}>
      {chat.name + ' - id: ' + chat.id} 
    </li>
  );
};

export default Chat;
