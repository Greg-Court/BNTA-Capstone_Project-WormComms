import React, { useState } from "react";
import Chats from "./Chats";
import People from "./People";
import Requests from "./Requests";
import SideBarSelector from "./SideBarSelector";

function SideBar({newMessage}) {
  const [tab, setTab] = useState("chats");

  return (
    <div className="min-w-[25%] border-gray-300 border-l-2 border-t-2 border-b-2">
      <SideBarSelector setTab={setTab} tab={tab}></SideBarSelector>
      {tab === "chats" ? <Chats newMessage={newMessage} /> : null}
      {tab === "people" ? <People /> : null}
      {tab === "requests" ? <Requests /> : null}
    </div>
  );
}

export default SideBar;


