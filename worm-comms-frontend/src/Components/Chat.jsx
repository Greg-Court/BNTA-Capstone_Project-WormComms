import React from "react";
import { getChatById } from "../api";
import { useCurrentChat } from "../ChatContext";
import { useState } from "react";
import { updateChat } from "../api";
import { GrGroup, GrUser } from "react-icons/gr";

const Chat = ({ chat }) => {
  const { currentChat, setCurrentChat } = useCurrentChat();
  const [isEditing, setisEditing] = useState(false);
  const [newName, setNewName] = useState(chat.name);

  const handleDoubleClick = () => {
    setisEditing(true);
  };

  const handleNameChange = async (e) => {
    try {
      if (e.key === "Enter") {
        setisEditing(false);
        if (newName !== chat.name) {
          await updateChat(chat.id, { ...chat, name: newName });
          const updatedChat = await getChatById(chat.id);
          setCurrentChat(updatedChat.data);
        }
      }
    } catch (error) {
      console.error("Error updating chat name:", error);
    }
  };

  const handleChatClick = async () => {
    //get current chat from the backend
    const newUpdatedChat = await getChatById(chat.id);
    setCurrentChat(newUpdatedChat.data);
  };

  const isSelected = chat.id === currentChat?.id;
  const lastMessage = chat.messages[chat.messages.length - 1];
  const participants = chat.participants
    .map((participant) => participant.username)
    .join(", ");

  return (
    <li
      key={chat.id}
      onClick={handleChatClick}
      onDoubleClick={handleDoubleClick}
      className={`cursor-pointer rounded-xl px-5 py-2 mx-[5%] ${
        isSelected ? "font-bold bg-blue-200 shadow-lg" : ""
      }`}
    >
      <div className="flex items-center">
        {chat.participants.length > 2 ? (
          <div className="w-12 h-12 mr-3 rounded-full bg-blue-400 flex items-center justify-center">
            <GrGroup className="w-8 h-8" />
          </div>
        ) : (
          <div className="w-12 h-12 mr-3 rounded-full bg-blue-400 flex items-center justify-center">
            <GrUser className="w-8 h-8" />
          </div>
        )}
        <div>
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleNameChange}
              className="border rounded-md px-2 py-1"
              autoFocus
            />
          ) : (
            <div className="font-semibold">{chat.name}</div>
          )}
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
