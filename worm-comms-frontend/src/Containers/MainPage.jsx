import MessageContainer from "./MessageContainer";
import LoginPortal from "../Components/LoginPortal";
import { getAllChats } from "../api";
import useWebSocket from "../socket";
import { useCurrentUser } from "../UserContext";
import { useState, useEffect } from "react";
import MainPageNavbar from "../Components/MainPageNavbar";
import { useNavigate } from "react-router-dom";
import Chats from "./Chats";

const MainPage = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [conversations, setConversations] = useState([]);
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
          console.log(messages);
          setMessages((prevMessages) => [
            ...prevMessages,
            JSON.parse(message.body),
          ]);
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
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    const response = await getAllChats();
    setConversations(response.data);
  };

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
        <div className="border-1 h-[5vh]">
          <MainPageNavbar />
        </div>
        <div className="flex">
          <Chats className='flex flex-col'></Chats>
          <MessageContainer currentUser={currentUser} stompClient={stompClient} messages={messages} setMessages={setMessages}></MessageContainer>
        </div>
      </>
    )
  }
>>>>>>> e03ffc26783f814c51278ac1812051786615c85c
}

export default MainPage;
