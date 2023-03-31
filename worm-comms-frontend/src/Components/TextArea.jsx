import { useCurrentUser } from '../UserContext';
import { useState } from 'react';
import { useCurrentChat } from '../ChatContext';
import { BsChevronDoubleLeft } from 'react-icons/bs';

const TextArea = ({ stompClient }) => {
    const { currentUser, setCurrentUser } = useCurrentUser();
    const { currentChat, setCurrentChat } = useCurrentChat();

    const [message, setMessage] = useState({
        sender: currentUser,
        chat: { id: 1 },
        content: ""
    })

    const updateMessage = (e) => {
        setMessage({
            sender: currentUser,
            chat: { id: currentChat.id },
            content: e.target.value
        })
    }

    const sendMessage = () => {
        if (message.content !== "") {
            const messageRequest = {
                senderId: currentUser.id,
                chatId: currentChat.id,
                content: message.content
            };
            stompClient.send("/app/user", {}, JSON.stringify(messageRequest));
            //console.log(JSON.stringify(messageRequest));
            setMessage({
                sender: currentUser,
                chat: { id: currentChat.id },
                content: ""
            });
            // console.log(currentUser);
        }
    };

    //sends message on enter
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

