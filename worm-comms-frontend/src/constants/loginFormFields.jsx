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
        labelFor: "firstName", 
        id: "firstName",
        name: "firstName",
        type: "text",
        autocomplete: "firstName",
        isRequired: true, 
        placeholder: "First Name"
    } ,
    {
        labelText: "Last Name",
        labelFor: "lastName", 
        id: "lastName",
        name: "lastName",
        type: "text",
        autocomplete: "lastName",
        isRequired: true, 
        placeholder: "Last Name"
    }
]

const profileFields = [
    {
        labelText: "Username",
        labelFor: "username", 
        id: "username",
        name: "username",
        type: "text",
        autocomplete: "username",
        isRequired: true, 
        placeholder: "username"
    },
    {
        labelText: "Email address",
        labelFor: "emailaddress", 
        id: "emailaddress",
        name: "email",
        type: "email",
        autocomplete: "email",
        isRequired: true, 
        placeholder: "email"
    },
    {
        labelText: "Change Password",
        labelFor: "password", 
        id: "password",
        name: "password",
        type: "password",
        autocomplete: "password",
        isRequired: true, 
        placeholder: "password"
    },
    {
        labelText: "Confirm New Password",
        labelFor: "confirm-new-password", 
        id: "confirm-new-password",
        name: "confirm-new-password",
        type: "password",
        autocomplete: "confirm-new-password",
        isRequired: true, 
        placeholder: "Confirm New Password"
    },
    {
        labelText: "First Name",
        labelFor: "firstName", 
        id: "firstName",
        name: "firstName",
        type: "text",
        autocomplete: "firstName",
        isRequired: true, 
        placeholder: "firstName"
    } ,
    {
        labelText: "Last Name",
        labelFor: "lastName", 
        id: "lastName",
        name: "lastName",
        type: "text",
        autocomplete: "lastName",
        isRequired: true, 
        placeholder: "lastName"
    },
    {
        labelText: "Personal Bio",
        labelFor: "bio", 
        id: "bio",
        name: "bio",
        type: "bio",
        autocomplete: "bio",
        isRequired: true, 
        placeholder: "bio"
    }, 

]

export {loginFields, signUpFields, profileFields};