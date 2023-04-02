import MessageContainer from "./MessageContainer";
import LoginPortal from "../Components/LoginPortal";
import { getAllChats } from "../api";
import useWebSocket from "../socket";
import { useCurrentUser } from "../UserContext";
import { useState, useEffect } from "react";
import MainPageNavbar from "../Components/MainPageNavbar";
import { useNavigate } from "react-router-dom";
import Chats from "./Chats";
import { useCurrentChat } from "../ChatContext";
import SideBar from "./SideBar";

const MainPage = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { currentChat, setCurrentChat } = useCurrentChat();

  //const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate()
  const stompClient = useWebSocket();

  useEffect(() => {
    if (stompClient) {
      stompClient.connect({}, () => { });
    }
  }, [stompClient]);

  useEffect(() => {
    if (stompClient && currentUser) {
      const onConnect = () => {
        stompClient.subscribe("/user", (message) => {
          //the call back for subscribe just appends the message onto whatever chat is being displayed
          setNewMessage(JSON.parse(message.body));
          // console.log(currentChat)
          // console.log(JSON.parse(message.body).chat)
          // if (currentChat.id === JSON.parse(message.body).chat.id)
          //   setMessages((prevMessages) => [
          //     ...prevMessages,
          //     JSON.parse(message.body),
          //   ]);
        });
      };
      if (stompClient.connected) {
        onConnect();
      } else {
        stompClient.connect({}, onConnect);
      }
      return () => {
        if (stompClient.connected) {
          stompClient.disconnect();
        }
      };
    }
  }, [stompClient, currentUser]);
  
  useEffect(() => {
    if (currentChat != null) {
      console.log("help")
      console.log(currentChat)
      console.log(newMessage)
      if (currentChat.id === newMessage.chat.id)
        setMessages((prevMessages) => [
          ...prevMessages,
          newMessage,
        ]);
    }
  }, [newMessage])

  // don't think this is used
  // useEffect(() => {
  //   fetchConversations();
  // }, []);

  // const fetchConversations = async () => {
  //   const response = await getAllChats();
  //   setConversations(response.data);
  // };

<<<<<<< HEAD
    if (currentUser === null) {
        navigate("/");
    } else {
        return (
            <>
                <div className=" flex border-1 h-[5vh]">
                  <MainPageNavbar currentUser={currentUser} stompClient={stompClient}/>
                </div>
                <div className="flex">
                    <Chats className='flex flex-col'></Chats>
                    <MessageContainer currentUser={currentUser} stompClient={stompClient} messages={messages}></MessageContainer>
                </div>
            </>
        )
    }
=======
  if (currentUser === null) {
    navigate("/");
  } else {
    return (
      <>
        <div className="h-[5vh]">
          <MainPageNavbar />
        </div>
        <div className="flex">
          <SideBar></SideBar>
          <MessageContainer currentUser={currentUser} stompClient={stompClient} messages={messages} setMessages={setMessages}></MessageContainer>
        </div>
      </>
    )
  }
>>>>>>> main
}

export default MainPage;
