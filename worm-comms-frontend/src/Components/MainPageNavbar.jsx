import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Menu from '../assets/menu-outline.svg';
import Close from '../assets/close-circle-outline.svg';

function MainPageNavbar() {

    const [click, setClick] = useState(false);

    return(
        <>
        <div>
          <nav className =" flex flex-col  fixed z-40 items-left w-full bg-blue-600 md:flex md:flex-row md:justify-between md:items-center">
            
            <div className = "flex w-7/12 mb-50 md:pl-5 pl-5">
              <span className=" flex font-bold rounded-md text-white bg-blue-600 justify-self-center items-center w-full text-3xl sm:text-3xl md:text-3xl lg:text-4xl">WormComms</span>
            </div>   
            
            
            <ul className= {`flex flex-col items-center bg-blue-600  z-[-1] md:z-auto left-0 w-full md:-w-auto pl-0 md:flex md:flex-col md:items-center md:pb-0 pb-2 md:pr-5 absolute ease-in text-sm sm:text-sm md:text-sm lg:text-lg font-poppins text-white ${click ? 'top-10 opacity-100 bg-blue-600  bg-opacity-80' : 'top-[-490px]'} opacity-100`}>
              
              <li className="p-5 md:p-2 md:flex md:justify-between">
                <Link to="/profile" className=" px-5 hover:text-gray-400 duration-500">PROFILE</Link>
              </li>
              <li className="p-5 md:p-2 md:flex md:justify-between">
                <Link to="/" className=" px-5 hover:text-gray-400 duration-500">LOGOUT</Link>
              </li>

            </ul>

            <div onClick={()=>setClick(!click)}>
              <img src={click ? Close : Menu} alt="MENU" className="flex bg-white rounded-xl absolute top-0 right-0 w-8 h-8 cursor-pointer text-white text-md"/>
            </div>

          </nav>  
        </div>
        
        </>
    )

}

export default MainPageNavbar;