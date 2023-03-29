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
        stompClient.publish("/app/user", {}, JSON.stringify(message));
    }

    return (
        <div className="flex bottom">
            <textarea className="border-2 w-5/6"
                id="messageInput" name="messageInput" placeholder="Type your message here"></textarea>
            <button onClick={sendMessage} className="border-2 w-1/12">Send</button>
            <button className="border-2 w-1/12">Toggle ChatGPT</button>
        </div>
    )
}

export default TextArea