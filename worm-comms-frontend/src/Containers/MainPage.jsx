import Contacts from "./Contacts";
import MessageContainer from "./MessageContainer";
import LoginPortal from "../Components/LoginPortal";
import { getAllConversations } from "../api";
import useWebSocket from "../socket";
import { useCurrentUser } from "../UserContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate()
  const stompClient = useWebSocket();

  useEffect(() => {
    if (stompClient) {
      stompClient.connect({}, () => {});
    }
  }, [stompClient]);

  useEffect(() => {
    if (stompClient && currentUser) {
      const onConnect = () => {
        stompClient.subscribe("/user", (message) => {
          console.log("Message.body: ", JSON.parse(message.body));
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
    const response = await getAllConversations();
    setConversations(response.data);
  };

    if (currentUser === null) {
        navigate("/");
    } else {
        return (
            <>
                <div className="border-2 h-[5vh]">WormComms</div>
                <div className="flex">
                    <Contacts className='flex flex-col'></Contacts>
                    <MessageContainer currentUser={currentUser} stompClient={stompClient} messages={messages}></MessageContainer>
                </div>
            </>
        )
    }
}

export default MainPage;
