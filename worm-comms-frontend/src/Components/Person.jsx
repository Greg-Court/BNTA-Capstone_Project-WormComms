import React from "react";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";
import {
  createFriend,
  acceptFriendRequest,
  rejectFriendRequest,
  blockFriend,
  unfriend,
} from "../api";

const Person = ({ person, currentUser, isFriend, isIncomingRequest }) => {
  const [friendStatus, setFriendStatus] = useState(isFriend);

  const handleAddFriend = async () => {
    console.log("Add friend");
    const friend = { user1: currentUser, user2: person, status: "PENDING" };
    await createFriend(friend);
    setFriendStatus(true);
  };
  
  console.log("Current user friends: ", currentUser.friends);
  const handleRemoveFriend = async () => {
    console.log("Remove friend");
    const friend = currentUser.friends.find(
      (friend) => friend.userId === person.id
    );
    await unfriend(friend.userId);
    setFriendStatus(false);
  };
  
  const handleBlock = async () => {
    console.log("Block user");
    let friend = currentUser.friends.find(
      (friend) => friend.userId === person.id
    );
    if (!friend) {
      const friendData = {
        user1: currentUser,
        user2: person,
        status: "PENDING",
      };
      friend = await createFriend(friendData);
      setFriendStatus(true);
      console.log("Friend:" + JSON.stringify(friend));
    }
    await blockFriend(friend.userId);
  };
  
  const handleAcceptRequest = async () => {
    console.log("Accept friend request");
    const friendId = currentUser.friends.find(
      (friend) => friend.userId === person.id
    ).id;
    await acceptFriendRequest(friendId);
  };
  
  const handleRejectRequest = async () => {
    console.log("Reject friend request");
    const friendId = currentUser.friends.find(
      (friend) => friend.userId === person.id
    ).id;
    await rejectFriendRequest(friendId);
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
            {isIncomingRequest ? (
              <div className="space-x-2 flex-shrink-0">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={handleAcceptRequest}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={handleRejectRequest}
                >
                  Reject
                </button>
              </div>
            ) : friendStatus ? (
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
