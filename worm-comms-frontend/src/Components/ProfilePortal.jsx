import { useState, useEffect } from "react";
import { profileFields } from "../constants/loginFormFields";
import Input from "./Input";
import { useCurrentUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

import { getUserById, updateUser } from "../api";

const ProfilePortal = () => {
    
    let navigate = useNavigate();

    const fields = profileFields;
    let fieldState = {};
    fields.forEach(field => fieldState[field.id] = '');
    
    const { currentUser, setCurrentUser } = useCurrentUser();
    const [profileState, setProfileState] = useState(fieldState);

    const handleProfileUpdates = async (e) => {
      setProfileState({ ...profileState, [e.target.id]: e.target.value });
    };

    const handleProfileSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await updateUser(currentUser.id, JSON.stringify(profileState));
        console.log(response.data);
    } catch (error){
        console.log(error);
        setProfileState({...profileState, error: "Something went wrong. Please try again later."});
    }
    }
    

    return (
        <form className="mt-8 space-y-6" >
        <div className="">
            {
                fields.map(
                    (field => 
                    <Input
                        key={field.id}
                        handleChange={handleProfileUpdates}
                        value={profileState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                    />
                ))
            }
         <button 
            type="Button"
            action='submit'
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
            onClick={handleProfileSubmit}
        >
            Submit
        </button>
        </div>

        </form>
    );
};


export default ProfilePortal;