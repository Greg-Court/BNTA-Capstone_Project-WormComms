import React from "react";
import { useState, useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import {
  createRelationship,
  acceptFriendRequest,
  rejectFriendRequest,
  blockPerson,
  unfriend,
  cancelFriendRequest,
  unblockPerson,
} from "../api";

const getRelationshipStatus = (currentUser, person) => {
  const relationship = currentUser.relationships.find(
    (relation) =>
      (relation.senderId === currentUser.id &&
        relation.receiverId === person.id) ||
      (relation.receiverId === currentUser.id &&
        relation.senderId === person.id)
  );
  if (relationship) {
    return relationship.status;
  } else {
    return "";
  }
};

const getRelationship = (currentUser, person) => {
  const relationship = person.relationships.find(
    (relation) =>
      (relation.senderId === currentUser.id &&
        relation.receiverId === person.id) ||
      (relation.receiverId === currentUser.id &&
        relation.senderId === person.id)
  );
  if (relationship) {
    return relationship;
  } else {
    return null;
  }
};

const Person = ({ person, currentUser, onRelationshipStatusChange }) => {
  const [relationshipStatus, setRelationshipStatus] = useState(
    getRelationshipStatus(currentUser, person)
  );
  const [relationship, setRelationship] = useState(
    getRelationship(currentUser, person)
  );

  const userProfilePicture = person.profilePicture
    ? new URL(
        `../../../worm-comms-backend/uploads/${person.profilePicture}`,
        import.meta.url
      ).href
    : null;

  useEffect(() => {
    setRelationshipStatus(getRelationshipStatus(currentUser, person));
    setRelationship(getRelationship(currentUser, person));
  }, [currentUser.relationships, person]);

  const handleAddFriend = async () => {
    const relationship = {
      user1: currentUser,
      user2: person,
      status: "PENDING",
    };
    await createRelationship(relationship);
    setRelationshipStatus("PENDING");
    onRelationshipStatusChange();
  };

  const handleRemoveFriend = async () => {
    await unfriend(currentUser.id, person.id);
    setRelationshipStatus("");
    onRelationshipStatusChange();
  };

  const handleBlock = async () => {
    await blockPerson(currentUser.id, person.id);
    setRelationshipStatus("BLOCKED");
    onRelationshipStatusChange();
  };

  const handleCancelRequest = async () => {
    await cancelFriendRequest(currentUser.id, person.id);
    setRelationshipStatus("");
    onRelationshipStatusChange();
  };

  const handleAcceptRequest = async () => {
    const updatedRelationship = await acceptFriendRequest(
      person.id,
      currentUser.id
    );
    setRelationshipStatus(updatedRelationship.status);
    onRelationshipStatusChange();
  };

  const handleRejectRequest = async () => {
    await rejectFriendRequest(currentUser.id, person.id);
    setRelationshipStatus("");
    onRelationshipStatusChange();
  };

  const handleUnblock = async () => {
    await unblockPerson(currentUser.id, person.id);
    setRelationshipStatus("");
    onRelationshipStatusChange();
  };

  const relationshipActions = () => {
    if (relationshipStatus === "FRIEND") {
      return (
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
      );
    } else if (
      relationshipStatus === "PENDING" &&
      relationship?.receiverId !== currentUser.id
    ) {
      return (
        <div className="space-x-2 flex-shrink-0">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={handleCancelRequest}
          >
            Cancel Request
          </button>
        </div>
      );
    } else if (
      relationshipStatus === "PENDING" &&
      relationship?.receiverId === currentUser.id
    ) {
      return (
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
      );
    } else if (relationshipStatus === "BLOCKED") {
      return (
        <div className="space-x-2 flex-shrink-0">
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={handleUnblock}
          >
            Unblock
          </button>
        </div>
      );
    } else {
      return (
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
      );
    }
  };
  return (
    <li key={person.id} className="cursor-pointer rounded-xl px-5 py-2 mx-[5%]">
      <div className="flex items-center justify-start">
        <div
          className={`w-12 h-12 mr-3 rounded-full ${
            !userProfilePicture ? "bg-blue-400" : ""
          } flex items-center justify-center`}
        >
          {userProfilePicture ? (
            <img
              src={userProfilePicture}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <BsPerson className="w-8 h-8" />
          )}
        </div>
        <div className="grid grid-rows-2 gap-0">
          <div className="flex font-semibold items-center">
            {person.username}
          </div>
          <div className="flex items-center">{relationshipActions()}</div>
        </div>
      </div>
    </li>
  );
};

export default Person;
