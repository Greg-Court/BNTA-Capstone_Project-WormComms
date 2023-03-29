import Contacts from "./Contacts";
import MessageContainer from "./MessageContainer"
import LoginPortal from "../Components/LoginPortal";
import { useState } from "react";

const MainPage = () => {

    const [currentUser,setCurrentUser] = useState(true);

    if(currentUser === null){
        return(
            <>
            <div class="border-2 h-[5vh]">header</div>
            <div class="flex justify-center items-center w-[100%] h-[95vh]">
                <LoginPortal></LoginPortal>
            </div>
            </>
        )
    } else {
        return (
            <>
            <div class="border-2 h-[5vh]">header</div>
            <div class="flex">
                <Contacts></Contacts>
                <MessageContainer></MessageContainer>
            </div>
            </>
        )
    }
}

export default MainPage;