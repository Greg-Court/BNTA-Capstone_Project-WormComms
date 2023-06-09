import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../public/menu-outline.svg";
import Close from "../../public/close-circle-outline.svg";


function MainPageNavbar() {
  const [click, setClick] = useState(false);

  return (
    <nav className="flex justify-between w-full bg-blue-600 h-full items-center">
      <div className="flex pl-5">
        <span className="font-bold text-white bg-blue-600 items-center w-full text-3xl">
          WormComms
        </span>
      </div>

      <ul
        className={`flex flex-col items-center bg-blue-600  z-[-1] md:z-auto left-0 w-full md:-w-auto pl-0 md:flex md:flex-col md:items-center md:pb-0 pb-2 md:pr-5 absolute ease-in text-sm sm:text-sm md:text-sm lg:text-lg font-poppins text-white ${
          click
            ? "top-10 opacity-100 bg-blue-600  bg-opacity-80"
            : "top-[-490px]"
        } opacity-100`}
      >
        <li className="p-5 md:p-2 md:flex md:justify-between">
          <Link
            to="/profile"
            className=" px-5 hover:text-gray-400 duration-500"
          >
            PROFILE
          </Link>
        </li>
        <li className="p-5 md:p-2 md:flex md:justify-between">
          <Link to="/" className=" px-5 hover:text-gray-400 duration-500">
            LOGOUT
          </Link>
        </li>
      </ul>

      <div onClick={() => setClick(!click)} className="cursor-pointer pr-5">
        <img
          src={click ? Close : Menu}
          alt="MENU"
          className="flex bg-white rounded-xl w-8 h-8 cursor-pointer text-white"
        />
      </div>
    </nav>
  );
}

export default MainPageNavbar;
