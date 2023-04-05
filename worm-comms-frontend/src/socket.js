
import SockJS from "sockjs-client";
import { useState, useEffect } from "react";
import { Stomp } from "@stomp/stompjs";

const useWebSocket = () => {
  const [client, setClient] = useState(null);
  useEffect(() => {
    // Create a new STOMP client using the WebSocket URL
    const endpoint = import.meta.env.VITE_APP_WS_BASE_URL

    const stompClient = Stomp.over(() => new SockJS(endpoint));

    // setClient function is called to update the client state with the newly created STOMP client
    // This makes the client available for use in the component.
    setClient(stompClient);
  }, []);
  // Return the 'client' state, which contains the Stomp client instance for WebSocket communication
  return client;
};

export default useWebSocket;
