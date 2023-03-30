import { useCurrentUser } from '../UserContext';
import { useState } from 'react';

const TextArea = ({ stompClient }) => {
    const { currentUser, setCurrentUser } = useCurrentUser();

    const [message, setMessage] = useState({
        sender: currentUser,
        chat: { id: 1 },
        content: ""
    })

    const updateMessage = (e) => {
        setMessage({
            sender: currentUser,
            chat: { id: 1 },
            content: e.target.value
        })
    }

    const sendMessage = () => {
        if (message.content !== "") {
            console.log(message)
            stompClient.send("/app/user", {}, JSON.stringify(message));
            setMessage({
                sender: currentUser,
                chat: { id: 1 },
                content: ""
            })
        }
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
            <textarea
                className="border-2 w-5/6"
                id="messageInput"
                name="messageInput"
                placeholder="Type your message here"
                value={message.content}
                onChange={updateMessage}></textarea>
            <button onClick={sendMessage} className="border-2 w-1/12">Send</button>
            <button className="border-2 w-1/12">Toggle ChatGPT</button>
        </div>
    )
}

export default TextArea;

