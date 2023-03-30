import { useState } from "react";
import { signUpFields } from "../constants/loginFormFields";
import Input from "./Input";

const fields = signUpFields;
let fieldState = {};
fields.forEach(field => fieldState[field.id] = '');

const SignUpPortal = () => {

    const [signUpState, setSignUpState] = useState(fieldState);
    

    const handleSignUp = (e) => {
        setSignUpState({... signUpState, [e.target.id]: e.target.value})
    }

    const handleSignUpSubmit=(e) => {
        e.preventDefault();
        conslone.log(signUpState)
        //createAccount();
    }
    //handle Signup API Integration here
    // const createAccount=()=>

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSignUpSubmit}>
        <div className="">
            {
                fields.map(field =>
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
                )
            }
         <button 
            type="Button"
            action='submit'
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
            onSubmit={handleSignUpSubmit}
        >
            Submit
        </button>
        </div>

        </form>
    )


}

export default SignUpPortal;