import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const useWebSocket = () => {
  const [client, setClient] = useState(null);
  useEffect(() => {
    // Create a new SockJS instance with the server URL where the WebSocket connection will be established
    const socket = new SockJS("http://localhost:8080/ws");
    // Create a new Stomp client instance using the 'socket' as a webSocketFactory
    // webSocketFactory is a function that returns a WebSocket instance, which the Stomp client
    // will use for communication. In this case, it returns the SockJS instance 'socket'
    const stompClient = new Client({webSocketFactory: () => socket});
    // Update the 'client' state with the newly created 'stompClient' instance
    setClient(stompClient);
  }, []);
  // Return the 'client' state, which contains the Stomp client instance for WebSocket communication
  return client;
};

export default useWebSocket;
