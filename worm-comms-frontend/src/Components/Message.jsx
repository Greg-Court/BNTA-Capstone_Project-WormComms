import React from "react";
import { AiOutlineRobot } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { useCurrentUser } from "../UserContext";
import { Menu, Item, useContextMenu } from 'react-contexify'
import "react-contexify/ReactContexify.css";
import { deleteMessage } from "../api";
import { useCurrentChat } from "../ChatContext";

const ChatBubbleReceive = ({ text, message }) => {
  const senderProfilePicture = message.sender.profilePicture
    ? new URL(
      `../../../worm-comms-backend/uploads/${message.sender.profilePicture}`,
      import.meta.url
    ).href
    : null;

  return (
    <div className="border border-blue-500 ml-[2.5%] max-w-xl p-3 bg-white rounded-xl shadow-lg flex items-center space-x-4 mb-5 grow-from-bottom-left">
      <div className="shrink-0">
        {senderProfilePicture ? (
          <img src={senderProfilePicture} className="h-12 w-12 rounded-full" />
        ) : (
          <AiOutlineRobot className="h-12 w-12" />
        )}
      </div>
      <div>
        <div className="text-xl font-medium text-black">
          {message.senderUsername}
        </div>
        <p className="text-slate-500">{text}</p>
      </div>
    </div>
  );
};

const ChatBubbleSend = ({ text, currentUser, message, updateMessages }) => {

  const { currentChat, setCurrentChat } = useCurrentChat();

  const MENU_ID = `message-context-menu-${message.id}`;

  const { show } = useContextMenu({ id: MENU_ID });

  const handleContextMenu = async (event) => {
    event.preventDefault();
    show({
      event,
      props: {
        messageId: message.id,
      },
    });
  };

  const handleMessageDelete = (e) => {
    deleteMessage(message.id)
    const index = currentChat.messages.indexOf(message);
    currentChat.messages.splice(index, 1)
    updateMessages();
  }

  const userProfilePicture = currentUser.profilePicture
    ? new URL(
      `../../../worm-comms-backend/uploads/${currentUser.profilePicture}`,
      import.meta.url
    ).href
    : null;

  return (
    <>
      <div className="border border-blue-500 mr-[2.5%] max-w-xl p-3 bg-white rounded-xl shadow-lg flex items-center space-x-4 mb-5 grow-from-bottom-right"
        onContextMenu={handleContextMenu}>
        <div className="shrink-0"></div>
        <div>
          <div className="text-xl font-medium text-black">Me</div>
          <p className="text-slate-500">{text}</p>
        </div>
        {userProfilePicture ? (
          <img src={userProfilePicture} className="h-12 w-12 rounded-full" />
        ) : (
          <BsPerson className="h-12 w-12" />
        )}
      </div>
      <Menu id={MENU_ID}>
        <Item onClick={handleMessageDelete}>Delete</Item>
      </Menu>
    </>
  );
};

const Message = ({ message, index, updateMessages }) => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const isSent = message.senderId === currentUser.id;
  if (isSent) {
    return (
      <div
        key={`${message.id}-${currentUser.profilePicture}`}
        className="w-full flex justify-end"
      >
        <ChatBubbleSend
          currentUser={currentUser}
          key={index}
          text={message.content}
          message={message}
          updateMessages={updateMessages}
        />
      </div>
    );
  } else {
    return (
      <div key={index} className="w-full flex justify-start">
        <ChatBubbleReceive
          key={index}
          text={message.content}
          message={message}
        />
      </div>
    );
  }
};

export default Message;
