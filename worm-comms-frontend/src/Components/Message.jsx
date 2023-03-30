const Message = ({ message, index }) => {
    return <li key={index}>{message.content}</li>;
  };
  
  export default Message;