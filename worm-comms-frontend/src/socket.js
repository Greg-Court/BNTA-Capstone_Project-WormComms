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


// const socket = new SockJS("http://localhost:8080/ws");
// This line creates a new SockJS instance with the server URL where the WebSocket connection will be established. 
// SockJS is a JavaScript library that provides a WebSocket-like object, enabling low-latency communication between a client and a server. 
// SockJS is particularly useful because it gracefully falls back to alternative communication methods (like long polling) 
// when a true WebSocket connection is not available, ensuring compatibility with older browsers or restrictive network environments.

// const stompClient = new Client({webSocketFactory: () => socket});
// This line creates a new Stomp client instance, which uses the SockJS instance socket for communication. 
// Stomp is a higher-level messaging protocol that works on top of WebSockets (or other compatible transports like SockJS) 
// to provide a simple and reliable way to exchange messages between a client and a server. 
// It supports features like message acknowledgments, subscriptions, and headers, making it more versatile than using raw WebSockets alone.


