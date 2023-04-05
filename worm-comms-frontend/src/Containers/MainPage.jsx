import MessageContainer from "./MessageContainer";
import { getAllUsers } from "../api";
import useWebSocket from "../socket";
import { useCurrentUser } from "../UserContext";
import { useState, useEffect } from "react";
import MainPageNavbar from "../Components/MainPageNavbar";
import { useNavigate } from "react-router-dom";
import { useCurrentChat } from "../ChatContext";
import SideBar from "./SideBar";
import { useOAuthContext } from "../OAuthTokenHeader";
import axios from "axios";

const MainPage = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { currentChat, setCurrentChat } = useCurrentChat();
  const { oAuthToken } = useOAuthContext();

  const [newMessage, setNewMessage] = useState([]);

  const refreshUser = async () => {
    const users = await getAllUsers().then((response) => response.data);
    for (let user of users) {
      if (currentUser.email === user.email) {
        setCurrentUser(user);
      }
    }
  };

  const navigate = useNavigate();
  const stompClient = useWebSocket();


  useEffect(() => {
    if (stompClient) {
      stompClient.connect({
        headers: {
          'Content-Type': 'application/json',
          'mode':'cors',
          'Authorization' : `Bearer ${oAuthToken}`
      },
      }, () => {
        onConnect();
      });
    }
  }, [stompClient]);


  const onConnect = () => {
    stompClient.subscribe(`/user/${currentUser.id}`, (message) => {
      //the call back for subscribe just appends the message onto whatever chat is being displayed
      let responseDTO = JSON.parse(message.body);
      setNewMessage(responseDTO)
    });
  };

  useEffect(() => {
    if (currentChat != null) {
      if (currentChat.id === newMessage.chatId)
        setCurrentChat((prevChat) => ({
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        }));
    }
  }, [newMessage])

  if (currentUser === null) {
    navigate("/");
  } else {
    return (
      <>
        <div className="h-[5vh]">
          <MainPageNavbar />
        </div>
        <div className="flex">
          <SideBar newMessage={newMessage} refreshUser={refreshUser}></SideBar>
          <MessageContainer stompClient={stompClient} refreshUser={refreshUser}></MessageContainer>
        </div>
      </>
    )
  }
}

export default MainPage;
