import Contacts from "./Contacts";
import MessageContainer from "./MessageContainer"

const MainPage = () => {
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

export default MainPage;