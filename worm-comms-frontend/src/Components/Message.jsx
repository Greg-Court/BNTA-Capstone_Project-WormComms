import React from "react";
import { AiOutlineRobot } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

const ChatBubbleReceive = ({ text }) => {
    return (
      <div className="p-3 bg-white rounded-xl shadow-lg flex items-center space-x-4 mb-5 justify-start grow-from-bottom-left max-w-xl">
        <div className="shrink-0">
          <AiOutlineRobot className="h-12 w-12" />
        </div>
        <div>
          <div className="text-xl font-medium text-black">Someone</div>
          <p className="text-slate-500">{text}</p>
        </div>
      </div>
    );
  };
  
  const ChatBubbleSend = ({ text }) => {
    return (
      <div className="p-3 bg-white rounded-xl shadow-lg flex items-center space-x-4 mb-5 justify-end grow-from-bottom-right max-w-xl">
        <div className="shrink-0"></div>
        <div>
          <div className="text-xl font-medium text-black">Me</div>
          <p className="text-slate-500">{text}</p>
        </div>
        <BsPerson className="h-12 w-12" />
      </div>
    );
  };

const Message = ({ message, index, currentUser }) => {
  const isSent = message.sender === currentUser;
  console.log("Message.sender:", message.sender);
  console.log("currentUser:", currentUser);
  if (isSent) {
    return <ChatBubbleSend key={index} text={message.content} />;
  } else {
    return <ChatBubbleReceive key={index} text={message.content} />;
  }
};

export default Message;