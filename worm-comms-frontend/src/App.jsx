import { useState } from "react";
import { ChatProvider } from "./ChatContext";
import MainPage from "./Containers/MainPage";
import { UserProvider } from "./UserContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChatProvider>
        <UserProvider>
          <MainPage></MainPage>
        </UserProvider>
      </ChatProvider>
    </>
  );
}

export default App;
