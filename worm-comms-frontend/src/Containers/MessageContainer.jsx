import Messages from "../Components/Messages";
import TextArea from "../Components/TextArea";

const MessageContainer = ({ stompClient, messages, setMessages }) => {
  return (
    <div className="w-[85%] h-[95vh] border-gray-300 border-2 flex flex-col justify-between">
        <Messages stompClient={stompClient} messages={messages} setMessages={setMessages}></Messages>
        <TextArea stompClient={stompClient}></TextArea>
    </div>
  );
};

export default MessageContainer;
