import React from "react";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";

const Person = ({ person, currentUser, isFriend }) => {
  const [friendStatus, setFriendStatus] = useState(isFriend);

  const handleAddFriend = () => {
    console.log("Add friend");
    setFriendStatus(true);
  };

  const handleRemoveFriend = () => {
    console.log("Remove friend");
    setFriendStatus(false);
  };

  const handleBlock = () => {
    console.log("Block user");
  };

  return (
    <li key={person.id} className="cursor-pointer rounded-xl px-5 py-2 mx-[5%]">
      <div className="flex items-center justify-start">
        <div className="w-12 h-12 mr-3 rounded-full bg-blue-400 flex items-center justify-center">
          <BsPerson className="w-8 h-8" />
        </div>
        <div className="grid grid-rows-2 gap-0">
          <div className="flex font-semibold items-center">
            {person.username}
          </div>
          <div className="flex items-center">
            {friendStatus ? (
              <div className="space-x-2 flex-shrink-0">
                <button
                  className="bg-orange-500 text-white px-3 py-1 rounded"
                  onClick={handleRemoveFriend}
                >
                  Unfriend
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={handleBlock}
                >
                  Block
                </button>
              </div>
            ) : (
              <div className="space-x-2 flex-shrink-0">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={handleAddFriend}
                >
                  Add
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={handleBlock}
                >
                  Block
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Person;
