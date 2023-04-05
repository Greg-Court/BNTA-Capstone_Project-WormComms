
import React, { useState } from 'react'
import { useLocation } from "react-router-dom";


const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"

export default function Input({
    handleChange,
    labelText,
    labelFor,
    id,
    name,
    type,
    isRequired=false,
    placeholder,
    customClass, 
    value
}) {

  const location = useLocation();

  const isProfilePage = window.location.pathname === '/profile';
  





  return (
    <div className='my-5'>
        <label htmlFor={labelFor} className='sr-only'>
            {labelText}
        </label>
        {labelFor === "bio" ? (
            <textarea 
                onChange={handleChange}
                id={id}
                name={name}
                rows={3}
                required={isRequired}
                className={"rounded-md appearance-none relative block w-full h-20 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" + customClass}
                placeholder={placeholder} 
                value={value}
            />
        ) : (
            <input 
                onChange={handleChange}
                id={id}
                name={name}
                type={type}
                required={isRequired}
                className={fixedInputClass + customClass}
                placeholder={placeholder}
                value={value}
                />
        )}
    </div>
  )
}


