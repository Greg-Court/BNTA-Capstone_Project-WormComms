import React from "react";
import { getChatById } from "../api";
import { useCurrentChat } from "../ChatContext";

const Chat = ({ chat }) => {
  const { currentChat, setCurrentChat } = useCurrentChat();
  console.log("ChatXXXXXXXX:", chat);

  const handleChatClick = async () => {
    //get current chat from the backend
    const newUpdatedChat = await getChatById(chat.id);
    setCurrentChat(newUpdatedChat.data);
    console.log(currentChat);
  };

  const isSelected = chat.id === currentChat?.id;
  const lastMessage = chat.messages[chat.messages.length - 1];
  const participants = chat.participants.map((participant) => participant.username).join(', ');

  return (
    <li
      key={chat.id}
      onClick={handleChatClick}
      className={`cursor-pointer rounded-xl px-5 py-2 mx-[5%] ${isSelected ? "font-bold bg-blue-200 shadow-lg" : ""}`}
    >
      <div className="flex items-center">
        <div className="w-12 h-12 mr-3 rounded-full bg-gray-300" />
        <div>
          <div className="font-semibold">{chat.name}</div>
          <div className="text-xs text-gray-500">{participants}</div>
        </div>
      </div>
      <div className="text-xs text-gray-600 mt-1">
        {/* {lastMessage?.sender.username}: {lastMessage?.content} */}
        Someone: displaying last message is work in progress!
      </div>
    </li>
  );
};

export default Chat;