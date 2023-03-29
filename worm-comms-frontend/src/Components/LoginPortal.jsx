import { useState } from "react";
import { getAllUsers } from "../api";
import { useCurrentUser } from "../UserContext";

const LoginPortal = () => {

    const {currentUser, setCurrentUser} = useCurrentUser();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const updateUsername = (e) => {
        setUsername(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    //fetch users

    const handleLogIn = async () => {
        const users = await getAllUsers();
        for (let user of users.data) {
            if (username ==  user.username) {
                setCurrentUser(user);
            }
        }
    }

    return (
        <div className="border-2 ">
            <p className="flex justify-center">Log In</p>
            <p>Username:</p>
            <input onChange={updateUsername} className="w-[100%]" placeholder="username"></input>
            <p>Password:</p>
            <input onChange={updatePassword} className="w-[100%]" placeholder="password"></input>
            <button onClick={handleLogIn} className="flex justify-center">Log In</button>
            <button className="flex justif-center">Register</button>
        </div>
    )
}

export default LoginPortal