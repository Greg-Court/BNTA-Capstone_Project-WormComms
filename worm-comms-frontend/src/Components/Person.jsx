import React from "react";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";

const Person = ({ person }) => {

  return (
    <li
      key={person.id}
      className="cursor-pointer rounded-xl px-5 py-2 mx-[5%]"
    >
      <div className="flex items-center">
        <div className="w-12 h-12 mr-3 rounded-full bg-blue-400 flex items-center justify-center">
          <BsPerson className="w-8 h-8" />
        </div>

        <div>
          <div className="font-semibold">{person.username}</div>
        </div>
      </div>
    </li>
  );
};

export default Person;
