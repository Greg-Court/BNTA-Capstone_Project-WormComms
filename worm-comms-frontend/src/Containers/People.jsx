import { useEffect, useState } from "react";
import { getAllUsers } from "../api";
import { useCurrentUser } from "../UserContext";
import Select from "react-select";
import Person from "../Components/Person.jsx";

const People = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [people, setPeople] = useState([]);
  const [displayMode, setDisplayMode] = useState("search_users");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  const fetchUsers = async () => {
    const response = await getAllUsers();
    setPeople(response.data);
    console.log(people);
  };

  const handleDisplayModeChange = (selectedOption) => {
    setDisplayMode(selectedOption.value);
  };

  const displayOptions = [
    { value: "friends", label: "Friends" },
    { value: "search_users", label: "Search Users" },
  ];

  // tests whether at least ONE element in the array matches teh condition
  const isFriend = (person) => {
    return currentUser.friends.some((friend) => friend.userId === person.id);
  };

  const displayedPeople = people.filter((person) => {
    if (displayMode === "friends") {
      return isFriend(person);
    } else if (displayMode === "search_users") {
      return !isFriend(person) && person.id !== currentUser.id;
    }
    return false;
  });

  return (
    <div className="h-[85vh]">
      <div className="w-[100%] flex flex-col">
        <Select
          className="mx-[5%] overflow-y-auto mt-3"
          options={displayOptions}
          onChange={handleDisplayModeChange}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
        />
        {displayMode === "search_users" && (
          <input
            type="text"
            className="mx-[5%] my-3 border p-2 rounded"
            placeholder="Search users..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        )}
      </div>
      <div className="flex items-center justify-around"></div>
      <ul className="flex flex-col overflow-y-auto scrollbar-hide max-h-[78.5vh]">
        {displayedPeople
          .filter((person) =>
            person.username.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((person) => (
            <div key={person.id}>
              <div className="border mx-[5%] my-2"></div>
              <Person
                key={person.id}
                person={person}
                currentUser={currentUser}
                isFriend={isFriend(person)}
              />
            </div>
          ))}
      </ul>
    </div>
  );
};

export default People;
