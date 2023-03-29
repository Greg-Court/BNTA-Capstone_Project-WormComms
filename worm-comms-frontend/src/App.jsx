import { useState } from "react";
import MainPage from "./Containers/MainPage";
import { UserProvider } from "./UserContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserProvider>
        <MainPage></MainPage>
      </UserProvider>
    </>
  );
}

export default App;
