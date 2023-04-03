import { useEffect, useState } from "react";
import { getAllUsers } from "../api";
import { useCurrentUser } from "../UserContext";
import Select from "react-select";
import Person from "../Components/Person.jsx";
import { getUserRelationships } from "../api";

const People = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [people, setPeople] = useState([]);
  const [displayMode, setDisplayMode] = useState("search_users");
  const [searchText, setSearchText] = useState("");

  // had to change this from currentUser to currentUser.id cause it was causing infinite loop
  useEffect(() => {
    if (currentUser?.id) {
      fetchUsers();
    }
  }, [currentUser?.id]);

  const fetchUsers = async () => {
    const response = await getAllUsers();
    setPeople(response.data);
    console.log(people);
    const relationshipResponse = await getUserRelationships(currentUser.id);
    setCurrentUser({
      ...currentUser,
      relationships: relationshipResponse.data,
    });
  };

  const handleDisplayModeChange = (selectedOption) => {
    setDisplayMode(selectedOption.value);
  };

  const displayOptions = [
    { value: "search_users", label: "Users" },
    { value: "friends", label: "Friends" },
    { value: "incoming_requests", label: "Incoming Requests" },
  ];

  // tests whether at least ONE element in the array matches teh condition
  const isRelationship = (person) => {
    return currentUser.relationships.some((friend) => friend.userId === person.id);
  };

  const displayedPeople = people.filter((person) => {
    if (displayMode === "friends") {
      return isRelationship(person);
    } else if (displayMode === "search_users") {
      return !isRelationship(person) && person.id !== currentUser.id;
    } else if (displayMode === "incoming_requests") {
      return person.relationships.some(
        (friend) =>
          friend.status === "PENDING" && friend.userId === currentUser.id
      );
    }
    return false;
  });

  return (
    <div className="h-[85vh]">
      <div className="w-[100%] flex flex-col">
        <Select
          className="mx-[5%] overflow-y-auto mt-3 mb-1"
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
            className="mx-[5%] my-2 border p-2 rounded"
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
          .map((person) => {
            const isIncomingRequest = displayMode === "incoming_requests";
            return (
              <div key={person.id}>
                <div className="border mx-[5%] my-2"></div>
                <Person
                  key={person.id}
                  person={person}
                  currentUser={currentUser}
                  isFriend={isRelationship(person)}
                  isIncomingRequest={isIncomingRequest}
                />
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default People;
