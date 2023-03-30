import React from 'react'
import LoginHeader from '../Components/LoginHeader'
import SignUpPortal from '../Components/SignUpPortal'

export default function SignUpPage() {
  return (
   <>
         <LoginHeader
            heading= "Sign up to create an account"
            paragraph="Already have an account? "
            linkName="Login here"
            linkUrl='/'
        />
        <SignUpPortal/>
   
   </>
  )
}
