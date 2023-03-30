import { useEffect } from "react"
import { useCurrentUser } from "../UserContext";
import Friend from "../Components/Friend";

const Contacts = () => {

    const { currentUser, setCurrentUser } = useCurrentUser();

    const friends = currentUser.friends.map((friend, index) => {
        console.log(friend.user2)
        return (
            <Friend friend={friend} key={index}></Friend>
        )
    })


    return (
        <ul className="min-w-[15%] h-[95vh] border-2">
            <li>Friends:</li>
            {friends}
        </ul>
    )
}

export default Contacts