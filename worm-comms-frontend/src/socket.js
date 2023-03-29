import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

// Custom hook to create and manage a WebSocket connection
const useWebSocket = () => {
  // The client state will store the STOMP client, which will be used to manage the WebSocket connection
  const [client, setClient] = useState(null);

  // Use the useEffect hook to create a WebSocket connection when the hook is used
  useEffect(() => {
    // Create a new SockJS instance URL points to the backend WebSocket URL
    const socket = new SockJS("http://localhost:8080/ws");

    // new STOMP client is created using the SockJS instance
    // webSocketFactory option is a function that returns the SockJS instance when called
    // This setup allows the STOMP client to use the SockJS instance for communication
    const stompClient = new Client({webSocketFactory: () => socket});

    // setClient function is called to update the client state with the newly created STOMP client
    // This makes the client available for use in the component.
    setClient(stompClient);
  }, []);

  // Return the WebSocket client for use in components
  return client;
};

export default useWebSocket;
