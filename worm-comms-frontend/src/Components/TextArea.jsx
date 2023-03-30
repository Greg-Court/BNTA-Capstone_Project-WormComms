import { useCurrentUser } from '../UserContext';

const TextArea = ({stompClient}) => {
    const {currentUser, setCurrentUser} = useCurrentUser();

    const message = {
        app_user: currentUser,
        conversation: {id:1},
        content: "Hello World"
    }

    const sendMessage = () => {
        console.log(stompClient)
        stompClient.send("/app/user", {}, JSON.stringify(message));
    }


    // useEffect(() => {
        //     if (stompClient) {
          
        //         // Subscribe to the /topic/test destination to receive messages from the backend
        //         stompClient.subscribe("/topic/test", (response) => {
        //           const message = JSON.parse(response.body);
        //           console.log("Message from backend:", message);
        //         });
          
        //         // Send a test message to the backend
        //         stompClient.send("/app/test", {}, JSON.stringify("Hello from frontend!"));
        //       });
        //     }
        //   }, [stompClient]);
        

    return (
        <div className="flex bottom">
            <textarea className="border-2 w-5/6"
                id="messageInput" name="messageInput" placeholder="Type your message here"></textarea>
            <button onClick={sendMessage} className="border-2 w-1/12">Send</button>
            <button className="border-2 w-1/12">Toggle ChatGPT</button>
        </div>
    )
}

export default TextArea;

