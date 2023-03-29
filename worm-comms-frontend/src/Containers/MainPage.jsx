import Contacts from "./Contacts";
import MessageContainer from "./MessageContainer"
import LoginPortal from "../Components/LoginPortal";
import { useState, useEffect } from "react";
import { getAllConversations } from "../api";

const MainPage = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const [conversations, setConversations] = useState([]);

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
                <div class="border-2 h-[5vh]">WormComms</div>
                <div class="flex justify-center items-center w-[100%] h-[95vh]">
                    <LoginPortal setCurrentUser={setCurrentUser}></LoginPortal>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div class="border-2 h-[5vh]">WormComms</div>
                <div class="flex">
                    <Contacts></Contacts>
                    <MessageContainer></MessageContainer>
                </div>
            </>
        )
    }
}

export default MainPage;