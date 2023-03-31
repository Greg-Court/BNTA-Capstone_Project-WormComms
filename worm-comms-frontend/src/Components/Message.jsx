import React from "react";
import { AiOutlineRobot } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { useCurrentUser } from "../UserContext";

const ChatBubbleReceive = ({ text, message }) => {
  return (
    <div className="max-w-xl p-3 bg-white rounded-xl shadow-lg flex items-center space-x-4 mb-5 grow-from-bottom-left">
      <div className="shrink-0">
        <AiOutlineRobot className="h-12 w-12" />
      </div>
      <div>
        <div className="text-xl font-medium text-black">{message.sender.username}</div>
        <p className="text-slate-500">{text}</p>
      </div>
    </div>
  );
};

const ChatBubbleSend = ({ text }) => {
  return (
    <div className="max-w-xl p-3 bg-white rounded-xl shadow-lg flex items-center space-x-4 mb-5 grow-from-bottom-right">
      <div className="shrink-0"></div>
      <div>
        <div className="text-xl font-medium text-black">Me</div>
        <p className="text-slate-500">{text}</p>
      </div>
      <BsPerson className="h-12 w-12" />
    </div>
  );
};

const Message = ({ message, index }) => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const isSent = message.sender.id === currentUser.id;
  //console.log("Message.sender:", message.sender);
  //console.log("currentUser:", currentUser);
  if (isSent) {
    return (
      <div key={index} className="w-full flex justify-end">
        <ChatBubbleSend key={index} text={message.content}/>
      </div>
    );
  } else {
    return (
      <div key={index} className="w-full flex justify-start">
        <ChatBubbleReceive key={index} text={message.content} message={message} />
      </div>
    );
  }
};

export default Message;
