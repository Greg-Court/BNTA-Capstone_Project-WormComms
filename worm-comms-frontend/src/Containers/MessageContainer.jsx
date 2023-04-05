import Messages from "../Components/Messages";
import TextArea from "../Components/TextArea";

const MessageContainer = ({ stompClient}) => {
  return (
    <div className="w-[85%] h-[95vh] border-gray-300 border-2 flex flex-col justify-between">
        <Messages stompClient={stompClient} ></Messages>
        <TextArea stompClient={stompClient}></TextArea>
    </div>
  );
};

export default MessageContainer;
