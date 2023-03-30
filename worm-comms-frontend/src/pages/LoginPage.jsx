import React from 'react'
import LoginHeader from '../Components/LoginHeader'

import LoginPortal from '../Components/LoginPortal'

export default function LoginPage() {
  return (
    <>
        <LoginHeader
            heading= "Login to WormComms"
            paragraph="Dont have an account yet? "
            linkName="Signup here"
            linkUrl='/signup'
        />
        <LoginPortal/>
    
    </>
  )
}
