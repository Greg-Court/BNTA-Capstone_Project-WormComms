import Contacts from "./Contacts";
import MessageContainer from "./MessageContainer";
import LoginPortal from "../Components/LoginPortal";
import { getAllConversations } from "../api";
import useWebSocket from "../socket";
import { useCurrentUser } from "../UserContext";
import { useState, useEffect } from "react";

const MainPage = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  const stompClient = useWebSocket();

  useEffect(() => {
    if (stompClient) {
      stompClient.connect({}, () => {});
    }
  }, [stompClient]);

  useEffect(() => {
    if (stompClient && currentUser) {
      // Subscribe to new messages
      stompClient.subscribe("/user", (message) => {
        console.log("Message.body: ", JSON.parse(message.body));
        setMessages((prevMessages) => [
          ...prevMessages,
          JSON.parse(message.body),
        ]);
      });
    }
  }, [stompClient, currentUser]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    const response = await getAllConversations();
    setConversations(response.data);
  };

    // if (currentUser === null) {
    //     return (
    //         <>
    //             <div className="border-2 h-[5vh]">WormComms</div>
    //             <div className="flex justify-center items-center w-[100%] h-[95vh]">
    //                 <LoginPortal setCurrentUser={setCurrentUser}></LoginPortal>
    //             </div>
    //         </>
    //     )
    // } else {
        return (
            <>
                <div className="border-2 h-[5vh]">WormComms</div>
                <div className="flex">
                    <Contacts></Contacts>
                    <MessageContainer currentUser={currentUser} stompClient={stompClient} messages={messages}></MessageContainer>
                </div>
            </>
        )
    }
// }

export default MainPage;
