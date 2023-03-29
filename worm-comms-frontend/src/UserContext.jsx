import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useCurrentUser = () => {
  return useContext(UserContext);
}

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;