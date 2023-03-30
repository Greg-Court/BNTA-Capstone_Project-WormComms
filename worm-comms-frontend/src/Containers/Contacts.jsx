import { useEffect } from "react"
import { useCurrentUser } from "../UserContext";
import Friend from "../Components/Friend";
import { useState } from "react";

const Contacts = () => {

    const { currentUser, setCurrentUser } = useCurrentUser();

    const [newChat, setNewChat] = useState(null);

    const friends = currentUser.friends.map((friend, index) => {
        console.log(friend.user2)
        return (
            <Friend friend={friend} key={index}></Friend>
        )
    })

    const updateNewChat = (e) => {
        
        setNewChat(currentUser.friends.filter((friend) => {return e.target.value=== friend.user2.username})[0].user2)
    }

    const createNewChat = () => {

    }


    return (
        <div className="min-w-[15%] h-[95vh] border-2">
            <div className="w-[100%]">
            <select 
            className="w-[80%]" 
            onChange={updateNewChat}
            value={newChat}>
                <option className="h-max-5vh">New Chat:</option>
                {friends}
            </select>
            <button onClick={createNewChat} className="w-[20%]"> + </button>
            </div>
        </div>
    )
}

export default Contacts