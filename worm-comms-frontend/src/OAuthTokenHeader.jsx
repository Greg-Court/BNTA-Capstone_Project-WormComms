import React, { createContext, useContext, useState } from 'react';

const OAuthContext = createContext();

export const useOAuthContext = () => {
  return useContext(OAuthContext);
}

export const OAuthProvider = ({children}) => {
    const [oAuthToken, setOAuthToken] = useState(null);

    return (
        <OAuthContext.Provider value={{oAuthToken, setOAuthToken}}>
            {children}
        </OAuthContext.Provider>
    )
}

export default OAuthProvider;