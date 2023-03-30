import Contacts from "./Contacts";
import MessageContainer from "./MessageContainer"
import LoginPortal from "../Components/LoginPortal";
import { useState, useEffect } from "react";
import { getAllConversations } from "../api";
import useWebSocket from "../socket";
import { useCurrentUser } from "../UserContext";

const MainPage = () => {
    const { currentUser, setCurrentUser } = useCurrentUser();
    const [conversations, setConversations] = useState([]);

    const stompClient = useWebSocket();

    useEffect(() => {
        if (stompClient) {
            stompClient.connect({}, () => {
            });
        }
    }, [stompClient]);

    useEffect(() => {
        if (stompClient !== null) {
            //subscribe to the user's chats
            console.log(stompClient)
            stompClient.subscribe("/app/user", () => console.log("recieved something"))
        }
    }, [currentUser])

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        const response = await getAllConversations();
        setConversations(response.data);
    };

    if (currentUser === null) {
        return (
            <>
                <div className="border-2 h-[5vh]">WormComms</div>
                <div className="flex justify-center items-center w-[100%] h-[95vh]">
                    <LoginPortal setCurrentUser={setCurrentUser}></LoginPortal>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="border-2 h-[5vh]">WormComms</div>
                <div className="flex">
                    <Contacts></Contacts>
                    <MessageContainer stompClient={stompClient}></MessageContainer>
                </div>
            </>
        )
    }
}

export default MainPage;