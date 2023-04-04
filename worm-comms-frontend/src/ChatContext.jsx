import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const useCurrentChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState(null);

  return (
    <ChatContext.Provider
      value={{ currentChat, setCurrentChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
