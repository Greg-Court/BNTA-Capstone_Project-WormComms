import { useEffect, useState } from "react";
import { getUserChats, createChat } from "../api";
import { useCurrentChat } from "../ChatContext";
import { useCurrentUser } from "../UserContext";
import Friend from "../Components/Friend";
import Chat from "../Components/Chat";

const Chats = () => {
  
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState([]);

  //on currentUser change update their chats from the backend
  useEffect(() => {
    if (currentUser) {
      fetchUserChats();
    }
  }, [currentUser]);

  //fetch the current user's chats from the backend
  const fetchUserChats = async () => {
    const response = await getUserChats(currentUser.id);
    setChats(response.data);
    // console.log(response.data);
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
        // console.log({ name, participantIds });
        //setChats((prevChats) => [...prevChats, newChat]);
        fetchUserChats();
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
    <div className="h-[85vh] pt-5">
      <div className="w-[100%] flex items-center justify-around">
      <select
        className="w-3/4 border-2 max-h-48 overflow-y-auto"
        onChange={updateNewChat}
        multiple
      >
        <option className="h-max-5vh py-2" disabled>
          Contacts:
        </option>
        {friends.map((friend) => (
          <option
            className="h-max-5vh py-2 hover:bg-blue-200"
            style={{ backgroundColor: friend.selected ? 'rgba(0, 0, 255, 0.1)' : 'transparent' }}
            key={friend.id}
          >
            {friend}
          </option>
        ))}
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
          <Chat key={chat.id} chat={chat}/>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
