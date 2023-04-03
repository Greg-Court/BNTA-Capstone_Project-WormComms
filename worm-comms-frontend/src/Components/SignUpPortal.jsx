import { useState } from "react";
import { signUpFields } from "../constants/loginFormFields";
import Input from "./Input";
import { createUser, getAllUsers } from '../api';

const fields = signUpFields;
let fieldState = {};
fields.forEach(field => fieldState[field.id] = '');

const SignUpPortal = () => {
  const [signUpState, setSignUpState] = useState(fieldState);

  const handleSignUp = (e) => {
    setSignUpState({ ...signUpState, [e.target.id]: e.target.value });
  };



const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const users = await getAllUsers().then((response) => response.data);
    if (!users.some(user => user.email === signUpState.emailaddress)) {
        try {
            const response = await createUser(JSON.stringify(signUpState));
            console.log(response.data);
        } catch (error){
            console.log(error);
            setSignUpState({...signUpState, error: "Something went wrong. Please try again later."});
        }
      } else {
        setSignUpState({... signUpState, error: "A user with that email address already exixts."});
      }   
}





  return (
    <form className="mt-8 space-y-6" onSubmit={handleSignUpSubmit}>
        {signUpState.error && <div className="text-red-500">{signUpState.error}</div>}
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleSignUp}
            value={signUpState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
          />
        ))}
        <button
          type="submit" 
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SignUpPortal;