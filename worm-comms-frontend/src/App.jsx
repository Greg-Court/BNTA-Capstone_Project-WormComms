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
import ProfilePage from "./pages/ProfilePage";
import Redirect from "./Components/Redirect";
import OAuthProvider from "./OAuthTokenHeader";

function App() {

  const [count, setCount] = useState(0);

  return (
    <>
    <OAuthProvider>
    <ChatProvider>
    <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/home" element={<MainPage/>}/>
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="/redirect" element={<Redirect/>} />
            <Route path="/authorized" element={<Redirect/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
      </ChatProvider>
      </OAuthProvider>
    </>
  );

}

export default App;