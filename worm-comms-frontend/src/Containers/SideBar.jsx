import React, { useState } from "react";
import Chats from "./Chats";
import People from "./People";
import SideBarSelector from "./SideBarSelector";

function SideBar({newMessage, refreshUser}) {
  const [tab, setTab] = useState("chats");

  return (
    <div className="min-w-[25%] border-gray-300 border-l-2 border-t-2 border-b-2">
      <SideBarSelector setTab={setTab} tab={tab}></SideBarSelector>
      {tab === "chats" ? <Chats newMessage={newMessage} refreshUser={refreshUser}/> : null}
      {tab === "people" ? <People  refreshUser={refreshUser}/> : null}
    </div>
  );
}

export default SideBar;


