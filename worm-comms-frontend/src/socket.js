import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// Custom hook to create and manage a WebSocket connection
const useWebSocket = () => {
  // Declare a state variable to store the WebSocket client
  const [client, setClient] = useState(null);

  // Use the useEffect hook to create a WebSocket connection when the hook is used
  useEffect(() => {
    // Create a new SockJS instance with the backend WebSocket URL
    const socket = new SockJS('http://localhost:8080/ws');
    
    // Create a new STOMP client using the SockJS instance
    const stompClient = new Client({
      webSocketFactory: () => socket,
    });

    // Update the WebSocket client state with the STOMP client
    setClient(stompClient);
  }, []);

  // Return the WebSocket client for use in components
  return client;
};

export default useWebSocket;