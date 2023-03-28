import Messages from '../Components/Messages'
import TextArea from '../Components/TextArea'


const MessageContainer = () => {
    return (
        <div class="w-[85%] h-[95vh] border-2 flex flex-col justify-between">
        <Messages></Messages>
        <TextArea></TextArea>
        </div>
    )
}

export default MessageContainer