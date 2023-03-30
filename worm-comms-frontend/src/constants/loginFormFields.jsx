const loginFields =[
    {
        labelText: "Email address",
        labelFor: "emailaddress", 
        id: "emailaddress",
        name: "email",
        type: "email",
        autocomplete: "email",
        isRequired: true, 
        placeholder: "Email address"
    },
    {
        labelText: "Password",
        labelFor: "password", 
        id: "password",
        name: "password",
        type: "password",
        autocomplete: "current-password",
        isRequired: true, 
        placeholder: "Password"
    }
]

const signUpFields = [
    {
        labelText: "Username",
        labelFor: "username", 
        id: "username",
        name: "username",
        type: "text",
        autocomplete: "username",
        isRequired: true, 
        placeholder: "Username"
    },
    {
        labelText: "Email address",
        labelFor: "emailaddress", 
        id: "emailaddress",
        name: "email",
        type: "email",
        autocomplete: "email",
        isRequired: true, 
        placeholder: "Email address"
    },
    {
        labelText: "Password",
        labelFor: "password", 
        id: "password",
        name: "password",
        type: "password",
        autocomplete: "current-password",
        isRequired: true, 
        placeholder: "Password"
    },
    {
        labelText: "Confirm Password",
        labelFor: "confirm-password", 
        id: "confirm-password",
        name: "confirm-password",
        type: "password",
        autocomplete: "confirm-password",
        isRequired: true, 
        placeholder: "Confirm Password"
    },
    {
        labelText: "First Name",
        labelFor: "first-name", 
        id: "first-name",
        name: "first-name",
        type: "text",
        autocomplete: "first-name",
        isRequired: true, 
        placeholder: "First Name"
    } ,
    {
        labelText: "Last Name",
        labelFor: "last-name", 
        id: "last-name",
        name: "last-name",
        type: "text",
        autocomplete: "last-name",
        isRequired: true, 
        placeholder: "Last Name"
    }
]

export {loginFields, signUpFields};