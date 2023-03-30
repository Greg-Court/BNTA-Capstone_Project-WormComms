import Messages from "../Components/Messages";
import TextArea from "../Components/TextArea";

const MessageContainer = ({ stompClient, messages }) => {
  return (
    <div className="w-[85%] h-[95vh] border-2 flex flex-col justify-between">
        <Messages stompClient={stompClient} messages={messages}></Messages>
        <TextArea stompClient={stompClient}></TextArea>
    </div>
  );
};

export default MessageContainer;
