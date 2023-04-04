
import SockJS from "sockjs-client";
import { useState, useEffect } from "react";
import { Stomp } from "@stomp/stompjs";

const useWebSocket = () => {
  const [client, setClient] = useState(null);
  useEffect(() => {
    // Create a new STOMP client using the WebSocket URL
    const endpoint = `http://localhost:8080/ws`

    const stompClient = Stomp.over(() => new SockJS(endpoint));

    // setClient function is called to update the client state with the newly created STOMP client
    // This makes the client available for use in the component.
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


