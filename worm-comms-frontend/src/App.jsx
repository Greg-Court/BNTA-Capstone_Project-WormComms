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
    <UserProvider>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/home" element={<MainPage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
      </div>
      </UserProvider>
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