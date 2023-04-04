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
  const { oAuthToken, setOAuthToken } = useOAuthContext();

  const [newMessage, setNewMessage] = useState([]);
  const [messages, setMessages] = useState([]);

  const refreshUser = async () => {
    const users = await getAllUsers().then((response) => response.data);
    console.log(users);
    for (let user of users) {
      if (currentUser.email === user.email) {
        setCurrentUser(user);
      }
    }
  };

  const navigate = useNavigate()
  const stompClient = useWebSocket();
  //comment

  useEffect(async () => {
    const users = await getAllUsers().then((response) => response.data);
    console.log(users)
    for (let user of users) {
     if (loginState.emailaddress === user.email) {
       setCurrentUser(user);
       navigate("/home");
       console.log(user)
     }
    }
    console.log(currentUser)
    if (currentUser === null) {
      navigate("/");
    }

    const token = sessionStorage.getItem('id-token');
    const headers = new Headers();

    headers.set('Content-type', 'plain/test');
    headers.set('Authorization', `Bearer ${token}`)

    setOAuthToken(headers);
  }, [])

  useEffect(() => {
    if (stompClient) {
      stompClient.connect({
        headers: oAuthToken
      }, () => {
        onConnect();
      });
    }
  }, [stompClient]);


  const onConnect = () => {
    stompClient.subscribe(`/user/${currentUser.username}`, (message) => {
      //the call back for subscribe just appends the message onto whatever chat is being displayed
      let responseDTO = JSON.parse(message.body);
      console.log(responseDTO)
      setNewMessage(responseDTO)
    });
  };

  useEffect(() => {
    if (currentChat != null) {
      //console.log(newMessage)
      if (currentChat.id === newMessage.chatId)
        setMessages((prevMessages) => [
          ...prevMessages,
          newMessage,
        ]);
    }
  }, [newMessage])

  // if (currentUser === null) {
  //   navigate("/");
  // } else
   {
    return (
      <>
        <div className="h-[5vh]">
          <MainPageNavbar />
        </div>
        <div className="flex">
          <SideBar newMessage={newMessage} refreshUser={refreshUser}></SideBar>
          <MessageContainer stompClient={stompClient} messages={messages} setMessages={setMessages} refreshUser={refreshUser}></MessageContainer>
        </div>
      </>
    )
  }
}

export default MainPage;
