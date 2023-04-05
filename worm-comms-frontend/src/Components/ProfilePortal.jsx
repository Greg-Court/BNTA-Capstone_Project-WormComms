import { useState } from "react";
import { profileFields } from "../constants/loginFormFields";
import Input from "./Input";
import { useCurrentUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../api";

const ProfilePortal = () => {
    
    let navigate = useNavigate();
    
    const [profileState, setProfileState] = useState({});
    const { currentUser } = useCurrentUser();

    const fields = [
        ...profileFields,
        {
            id: "profilePicture",
            labelText: "Profile Picture",
            labelFor: "profilePicture",
            name: "profilePicture",
            type: "file",
            placeholder: "",
        }
    ];

    const handleProfileUpdates = (e) => {
        setProfileState({ ...profileState, [e.target.id]: e.target.value });
    };

    const handleProfilePictureSelect = (e) => {
        console.log(e.target.files[0]); 
        setProfileState({ ...profileState, [e.target.id]: e.target.files[0] });
    };


     const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", profileState.username);
        formData.append("emailaddress", profileState.emailaddress);
        formData.append("password", profileState.password);
        formData.append("firstName", profileState.firstName);
        formData.append("lastName", profileState.lastName);
        formData.append("bio", profileState.bio);
        formData.append("profilePicture", profileState.profilePicture);

        try {
            const response = await updateUser(currentUser.id, formData);
            console.log(response.data);
            setProfileState({...profileState, response: "Profile updated successfully!"});
    
        } catch (error){
            console.log(error);
            setProfileState({...profileState, error: "Something went wrong. Please try again later."});
        }

    };

    return (
        <form id= "profile" className="mt-8 space-y-6" encType="multipart/form-data">
            {profileState.response && <div className="text-green-500">{profileState.response}</div>}
            {fields.map(field => (
                field.type === "file" ? (
                    <div key={field.id}>
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                            {field.labelText}
                        </label>
                        <div className="mt-1">
                            <input
                                type={field.type}
                                id={field.id}
                                name={field.id}
                                onChange={handleProfilePictureSelect}
                            />
                        </div>
                    </div>
                ) : (
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
                )
            ))}
            <button
                type="button"
                id="buttonid"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
                onClick={handleProfileSubmit}
            >
                Submit
            </button>
        </form>
    );
};

export default ProfilePortal;
