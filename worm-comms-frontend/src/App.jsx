import { useState } from "react";
import { ChatProvider } from "./ChatContext";
import MainPage from "./Containers/MainPage";
import { UserProvider } from "./UserContext";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {

  const [count, setCount] = useState(0);

  return (
    <>
    <ChatProvider>
    <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/home" element={<MainPage/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
      </ChatProvider>
    </>
  );

}

export default App;



  // const [count, setCount] = useState(0);

  // return (
  //   <>
  //     <UserProvider>
  //       <MainPage></MainPage>
  //     </UserProvider>
  //   </>
  // );