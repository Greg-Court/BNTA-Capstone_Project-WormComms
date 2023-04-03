import { useEffect, useState } from "react";
import { getUserChats, createChat } from "../api";
import { useCurrentUser } from "../UserContext";
import Friend from "../Components/Friend";
import Chat from "../Components/Chat.jsx";
import Select from "react-select";

const Chats = ({ newMessage }) => {

  const { currentUser, setCurrentUser } = useCurrentUser();

  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchUserChats();
    }
  }, [currentUser,newMessage]);

    const fetchUserChats = async () => {
      const response = await getUserChats(currentUser.id);
      setChats(response.data.reverse());
    };

  const handleCreateChat = async () => {
    if (newChat.length > 0) {
      const name = "New Chat";
      const participantIds = [
        currentUser.id,
        ...newChat.map((friend) => friend.userId),
      ];
      try {
        await createChat({ name, participantIds });
        fetchUserChats();
        setSelectedOptions([]);
        setNewChat([]);
      } catch (error) {
        console.error("Error creating chat:", error);
      }
    }
  };

  const friendsOptions = currentUser.relationships.map((friend) => ({
    value: friend.username,
    label: friend.username,
    data: friend,
  }));

  const updateNewChat = (selectedOptions) => {
    const selectedUsers = selectedOptions.map((option) => option.data);
    setNewChat(selectedUsers);
  };

  return (
    <div className="h-[85vh]">
      <div className="w-[100%] flex flex-col">
        <Select
          className="mx-[5%] overflow-y-auto mt-3"
          options={friendsOptions}
          onChange={(options) => {
            setSelectedOptions(options);
            updateNewChat(options);
          }}
          value={selectedOptions}
          isMulti
          placeholder="Select Contacts..."
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleCreateChat();
            }
          }}
        />
        <button
          onClick={handleCreateChat}
          className="mx-[5%] mt-3 mb-1 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Create New Chat
        </button>
      </div>
      <div className="flex items-center justify-around"></div>
      <ul className="flex flex-col overflow-y-auto scrollbar-hide max-h-[78.5vh]">
        {chats.map((chat) => (
          <div key={chat.id}>
            <div className="border mx-[5%] my-2"></div>
            <Chat key={chat.id} chat={chat} newMessage={newMessage} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
