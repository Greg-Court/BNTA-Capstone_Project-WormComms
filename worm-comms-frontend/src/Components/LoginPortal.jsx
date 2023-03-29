import { useState } from "react";

const LoginPortal = ({ setCurrentUser }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const updateUsername = (e) => {
        setUsername(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleLogIn = () => {
        if (username !== "" && password !== "") {
            setCurrentUser(true);
        }
    }

    return (
        <div class="border-2 ">
            <p class="flex justify-center">Log In</p>
            <p>Username:</p>
            <input onChange={updateUsername} class="w-[100%]" placeholder="username"></input>
            <p>Password:</p>
            <input onChange={updatePassword} class="w-[100%]" placeholder="password"></input>
            <button onClick={handleLogIn} class="flex justify-center">Log In</button>
        </div>
    )
}

export default LoginPortal