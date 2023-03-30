import { useEffect, useState } from "react";
import { getUserChats, createChat } from "../api";
import { useCurrentChat } from "../ChatContext";
import { useCurrentUser } from "../UserContext";
import Friend from "../Components/Friend";

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
  };

  const handleChatClick = (chat) => {
    setCurrentChat(chat);
  };

  const handleCreateChat = async () => {
    if (newChat.length > 0) {
      const name = "New Chat";
      const participantIds = [
        currentUser.id,
        ...newChat.map((user) => user.id),
      ];
      try {
        const newChat = await createChat({ name, participantIds });
        setChats((prevChats) => [...prevChats, newChat]);
      } catch (error) {
        console.error("Error creating chat:", error);
      }
    }
  };

  const friends = currentUser.friends.map((friend, index) => {
    return <Friend friend={friend} key={index}></Friend>;
  });

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
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => handleChatClick(chat)}>
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
