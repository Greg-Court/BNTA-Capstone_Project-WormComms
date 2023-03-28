const LoginPortal = () => {

    return (
        <div class="border-2 ">
            <p class="flex justify-center">Log In</p>
            <p>Username:</p>
            <input class="w-[100%]" defaultValue={"username"}></input>
            <p>Password:</p>
            <input class="w-[100%]" defaultValue={"password"}></input>
            <button class="flex justify-center">Log In</button>
        </div>
    )
}

export default LoginPortal