import Contacts from "./Contacts";
import MessageContainer from "./MessageContainer"
import LoginPortal from "../Components/LoginPortal";
import { useState, useEffect } from "react";
import { getAllConversations } from "../api";
import useWebSocket from "../socket";
import { useCurrentUser } from "../UserContext";
import React, { useCallback } from "react";

const MainPage = () => {
    const { currentUser, setCurrentUser } = useCurrentUser();
    const [conversations, setConversations] = useState([]);

    const handleNewMessage = useCallback((message) => {
        console.log("Received new message:", message);
        // Update the UI or state with the new message
    }, []);


    const stompClient = useWebSocket();

    useEffect(() => {
        if (stompClient) {
            stompClient.connect({}, () => {
            });
        }
    }, [stompClient]);

    useEffect(() => {
        if (stompClient && currentUser) {
            // Subscribe to new messages
            const subscription = stompClient.subscribe("/topic/new_messages", (message) => {
                handleNewMessage(JSON.parse(message.body));
            });

            return () => {
                // Clean up the subscription when the component is unmounted or the user changes
                subscription.unsubscribe();
            };
        }
    }, [stompClient, currentUser, handleNewMessage]);

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