import React from "react";
import { AiOutlineRobot } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { useCurrentUser } from "../UserContext";




const ChatBubbleReceive = ({ text, message}) => {

  const senderProfilePicture =  new URL(`../../../worm-comms-backend/uploads/${message.sender.profilePicture}`, import.meta.url).href
  console.log(message.sender)

  return (
    <div className="border border-blue-500 ml-[2.5%] max-w-xl p-3 bg-white rounded-xl shadow-lg flex items-center space-x-4 mb-5 grow-from-bottom-left">
      <div className="shrink-0">

      <img src={senderProfilePicture} className="h-12 w-12 rounded-full" />
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

const ChatBubbleSend = ({ text, currentUser }) => {
 
  const userProfilePicture =  new URL(`../../../worm-comms-backend/uploads/${currentUser.profilePicture}`, import.meta.url).href
  
  return (
    <div className="border border-blue-500 mr-[2.5%] max-w-xl p-3 bg-white rounded-xl shadow-lg flex items-center space-x-4 mb-5 grow-from-bottom-right">
      <div className="shrink-0"></div>
      <div>
        <div className="text-xl font-medium text-black">Me</div>
        <p className="text-slate-500">{text}</p>
      </div>
      <img src={userProfilePicture} className="h-12 w-12 rounded-full" />
    </div>
  );
};

const Message = ({ message, index }) => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const isSent = message.senderId === currentUser.id;
  //console.log("Message.sender:", message.sender);
  //console.log("currentUser:", currentUser);
  if (isSent) {
    return (
      <div key={`${message.id}-${currentUser.profilePicture}`} className="w-full flex justify-end">
        <ChatBubbleSend
          currentUser={currentUser}
          key={index}
          text={message.content}
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
