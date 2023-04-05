import { useCurrentUser } from "../UserContext";
import { useState } from "react";
import { useCurrentChat } from "../ChatContext";
import { generateAutoReplyArray } from "../../autoReply";
import { generateAutoReplyResponse } from "../../autoReply";

const TextArea = ({ stompClient }) => {
  const { currentUser } = useCurrentUser();
  const { currentChat } = useCurrentChat();
  const [message, setMessage] = useState({
    sender: currentUser,
    chat: { id: 1 },
    content: "",
  });


  const handleAutoReply = async () => {
    console.log(currentChat.messages)
    const messageArray = generateAutoReplyArray(currentChat.messages, currentUser);
    const chatGPTResponse = await generateAutoReplyResponse(messageArray);
    // console.log(chatGPTResponse);
    console.log(messageArray)
    setMessage({
      ...message,
      content: chatGPTResponse,
    });
  };
  const updateMessage = (e) => {
    setMessage({
      sender: currentUser,
      chat: { id: currentChat.id },
      content: e.target.value,
    });
  };

  const sendMessage = () => {
    if (message.content !== "") {
      const messageRequest = {
        senderId: currentUser.id,
        chatId: currentChat.id,
        content: message.content,
      };
      stompClient.send("/app/newMessage", {}, JSON.stringify(messageRequest));
      //console.log(JSON.stringify(messageRequest));
      setMessage({
        sender: currentUser,
        chat: { id: currentChat.id },
        content: "",
      });
      // console.log(currentUser);
    }
  };

  //sends message on enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex border-t-2 border-gray-300">
      <textarea
        className="w-5/6"
        id="messageInput"
        name="messageInput"
        placeholder="Type your message here"
        value={message.content}
        onKeyDown={handleKeyDown}
        onChange={updateMessage}
      ></textarea>
      <button onClick={sendMessage} className="border-l-2 w-1/12">
        Send
      </button>
      <button className="border-l-2 w-1/6" onClick={handleAutoReply}>
        Autoreply™
      </button>
    </div>
  );
};

export default TextArea;
