import { useEffect, useState } from "react";
import { getAllUsers } from "../api";
import { useCurrentUser } from "../UserContext";
import Select from "react-select";
import Person from "../Components/Person.jsx";
import { getUserRelationships } from "../api";

const People = ({refreshUser}) => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [people, setPeople] = useState([]);
  const [displayMode, setDisplayMode] = useState("search_users");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    refreshUser();
  }, [people]);

  // check if there is a specific relationship between two users
  const isRelationshipStatus = (person, status) => {
    // find the relationships where the current user is the sender
    const sentRelationship = currentUser.relationships.find(
      (relation) => relation.receiverId === person.id
    );
    // find relationships where the current user is the receiver
    const receivedRelationship = currentUser.relationships.find(
      (relation) => relation.senderId === person.id
    );

    if (status === "") {
      return (
        !sentRelationship &&
        !receivedRelationship &&
        person.id !== currentUser.id
      );
    } else {
      return (
        (sentRelationship && sentRelationship.status === status && person.id !== currentUser.id) ||
        (receivedRelationship && receivedRelationship.status === status && person.id !== currentUser.id)
      );
    }
  };

  const hasIncomingRequest = (person) => {
    const incomingRequest = person.relationships.find(
      (relation) =>
        relation.receiverId === currentUser.id &&
        relation.status === "PENDING" &&
        person.id !== currentUser.id
    );

    return !!incomingRequest; // !! typecasts value to boolean
  };

  const displayedPeople = people.filter((person) => {
    if (displayMode === "friends") {
      return isRelationshipStatus(person, "FRIEND");
    } else if (displayMode === "search_users") {
      return isRelationshipStatus(person, "");
    } else if (displayMode === "incoming_requests") {
      return hasIncomingRequest(person);
    } else if (displayMode === "outgoing_requests") {
      return isRelationshipStatus(person, "PENDING");
    } else if (displayMode === "blocked") {
      return isRelationshipStatus(person, "BLOCKED");
    }
    return false;
  });

  useEffect(() => {
    if (currentUser?.id) {
      fetchData();
    }
  }, [currentUser?.id]);

  useEffect(() => {
    fetchData();
  }, [displayMode]);

  const fetchData = async () => {
    const response = await getAllUsers();
    setPeople(response.data);
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
    { value: "outgoing_requests", label: "Outgoing Requests" },
    { value: "blocked", label: "Blocked" },
  ];

  return (
    <div className="h-[85vh]">
      <div className="w-[100%] flex flex-col shadow-md border-gray-300 border-b-2">
        <Select
          className="mx-[5%] overflow-y-auto mt-3 mb-1"
          options={displayOptions}
          onChange={handleDisplayModeChange}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
        />
        <input
          type="text"
          className="mx-[5%] my-2 border p-2 rounded"
          placeholder="Search users..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-around"></div>
      <ul className="flex flex-col overflow-y-auto scrollbar-hide max-h-[78vh]">
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
                onRelationshipStatusChange={fetchData}
              />
            </div>
          ))}
      </ul>
    </div>
  );
};

export default People;
