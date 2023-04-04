import { useState } from "react";
import { getAllUsers } from "../api";
import { loginFields } from "../constants/loginFormFields";
import { useCurrentUser } from "../UserContext";
import Input from "./Input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginPortal = () => {
  const navigate = useNavigate();
  const fields = loginFields;
  let fieldState = {};
  fields.forEach((field) => (fieldState[field.id] = ""));

  const { currentUser, setCurrentUser } = useCurrentUser();
  const [loginState, setLoginState] = useState(fieldState);

  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")

  // const updateEmail = (e) => {
  //     setEmail(e.target.value);
  // }

  // const updatePassword = (e) => {
  //     setPassword(e.target.value);
  // }

  //on login we should subscribe to our chats?

  const handleLogIn = async (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const users = await getAllUsers().then((response) => response.data);
    console.log(users)
    for (let user of users) {
      if (loginState.emailaddress === user.email) {
        setCurrentUser(user);
        navigate("/home");
        console.log(user)
      }
    }
  };

  return (
    <form className="mt-8 space-y-6">
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleLogIn}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <input
            id="remember"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Forgot your password?
          </a>
        </div>
      </div>
      <Link to={"/redirect"}>
      <button
        
        type="Button"
        action="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
      >
        Login
      </button>
      </Link>
    </form>
  );
};

export default LoginPortal;
