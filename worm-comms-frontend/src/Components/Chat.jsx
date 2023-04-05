import React from "react";
import { getChatById } from "../api";
import { useCurrentChat } from "../ChatContext";
import { useCurrentUser } from "../UserContext";
import { useState, useEffect } from "react";
import { updateChat, leaveChat } from "../api";
import { GrGroup, GrUser } from "react-icons/gr";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";

const MENU_ID = "chat-context-menu";

const Chat = ({ chat, newMessage, fetchUserChats }) => {
  const { currentChat, setCurrentChat } = useCurrentChat();
  const [isEditing, setisEditing] = useState(false);
  const [newName, setNewName] = useState(chat.name);
  const [lastMessage, setLastMessage] = useState(chat.name);
  const { show } = useContextMenu({ id: MENU_ID });
  const { currentUser } = useCurrentUser();

  const handleContextMenu = async (event) => {
    event.preventDefault();
    show({
      event,
      props: {
        chatId: chat.id,
      },
    });
  };

  const handleLeaveChat = async () => {
    try {
      await leaveChat(chat.id, currentUser.id);
      setCurrentChat(null);
      fetchUserChats();
    } catch (error) {
      console.error("Error leaving chat:", error);
    }
  };

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
          chat.name = updatedChat.data.name;
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
  const participants = chat.participants
    .map((participant) => participant.username)
    .join(", ");

  useEffect(() => {
    const updateLastMessage = () => {
      if (chat?.messages?.length === 0) {
        setLastMessage(chat.name);
      } else {
        let lm = chat?.messages.at(-1);
        setLastMessage(lm?.senderUsername + ": " + lm?.content);
      }
    };

    if (newMessage?.chat?.id === chat?.id) {
      setLastMessage(newMessage?.sender?.username + ": " + newMessage?.content);
    } else {
      updateLastMessage();
    }
  }, [newMessage, chat]);

  const truncateLastMessage = (message, maxLength = 65) => {
    if (message.length <= maxLength) {
      return message;
    }
    return message.slice(0, maxLength) + "...";
  };

  return (
    <>
      <li
        onContextMenu={handleContextMenu}
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
                className="border rounded-md px-2 py-1 w-full"
                autoFocus
              />
            ) : (
              <div key={chat.id} className="font-semibold">
                {chat.name}
              </div>
            )}
            <div className="text-xs text-gray-500">{participants}</div>
          </div>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          {truncateLastMessage(lastMessage)}
        </div>
      </li>
      <Menu id={MENU_ID}>
        <Item onClick={handleLeaveChat}>Leave Chat</Item>
      </Menu>
    </>
  );
};

export default Chat;
