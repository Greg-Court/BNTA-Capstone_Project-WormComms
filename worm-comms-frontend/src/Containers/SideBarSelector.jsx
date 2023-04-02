import React from "react";

const Tab = ({ label, isSelected, onClick }) => {
  return (
    <nav
      className={`flex-grow h-full flex justify-center items-center cursor-pointer ${
        isSelected
          ? "bg-white"
          : "bg-gray-200"
      }`}
      onClick={onClick}
    >
      {label}
    </nav>
  );
};

const SideBarSelector = ({ setTab, tab }) => {
  return (
    <div className="h-[5vh] flex">
      <Tab
        label="Chats"
        isSelected={tab === "chats"}
        onClick={() => setTab("chats")}
      />
      <Tab
        label="People"
        isSelected={tab === "people"}
        onClick={() => setTab("people")}
      />
      {/* <Tab
        label="Requests"
        isSelected={tab === "requests"}
        onClick={() => setTab("requests")}
      /> */}
    </div>
  );
};

export default SideBarSelector;
