import { useEffect, useState } from "react";
import { getUserChats, createChat } from "../api";
import { useCurrentChat } from "../ChatContext";
import { useCurrentUser } from "../UserContext";
import Friend from "../Components/Friend";
import Chat from "../Components/Chat";

const Chats = () => {
  const { currentChat, setCurrentChat } = useCurrentChat();
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchUserChats();
    }
  }, [currentUser]);

  const fetchUserChats = async () => {
    const response = await getUserChats(currentUser.id);
    setChats(response.data);
    console.log(response.data);
  };

  // this is the function that creates a new chat
  const handleCreateChat = async () => {
    if (newChat.length > 0) {
      const name = "New Chat";
      const participantIds = [
        currentUser.id,
        ...newChat.map((user) => user.id),
      ];
      try {
        const newChat = await createChat({ name, participantIds });
        newChat.messages = [];
        console.log({ name, participantIds });
        setChats((prevChats) => [...prevChats, newChat]);
      } catch (error) {
        console.error("Error creating chat:", error);
      }
    }
  };

  const friends = currentUser.friends.map((friend, index) => {
    return <Friend friend={friend} key={index}></Friend>;
  });

  // this is the function that updates the newChat state
  const updateNewChat = (e) => {
    const selectedUsers = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    ).map(
      (username) =>
        currentUser.friends.find((friend) => friend.user2.username === username)
          .user2
    );
    setNewChat(selectedUsers);
  };

  return (
    <div className="min-w-[25%] h-[95vh] border-2">
      <div className="w-[100%] flex items-center justify-around">
        <select className="w-[80%]" onChange={updateNewChat} multiple>
          <option className="h-max-5vh" disabled>
            Contacts:
          </option>
          {friends}
        </select>
        <button
          onClick={handleCreateChat}
          className="p-2 h-12 w-12 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          +
        </button>
      </div>
      <div className="flex items-center justify-around mt-2">
        <h1>Existing Chats:</h1>
      </div>
      <ul className="flex flex-col">
        {chats.map((chat) => (
          <Chat key={chat.id} chat={chat} setCurrentChat={setCurrentChat} currentChatId={currentChat?.id}/>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
