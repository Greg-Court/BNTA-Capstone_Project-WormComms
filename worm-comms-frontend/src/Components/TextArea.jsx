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
            stompClient.send("/app/user", {}, JSON.stringify(message));
            setMessage({
                sender: currentUser,
                chat: { id: 1 },
                content: ""
            })
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    }


    return (
        <div className="flex bottom">
            <textarea
                className="border-2 w-5/6"
                id="messageInput"
                name="messageInput"
                placeholder="Type your message here"
                value={message.content}
                onKeyDown={handleKeyDown}
                onChange={updateMessage}></textarea>
            <button onClick={sendMessage} className="border-2 w-1/12">Send</button>
            <button className="border-2 w-1/12">Toggle ChatGPT</button>
        </div>
    )
}

export default TextArea;

