import React from "react";
import LoginHeader from "../Components/LoginHeader";
import SignUpPortal from "../Components/SignUpPortal";

export default function SignUpPage() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        <LoginHeader
          heading="Sign up to create an account"
          paragraph="Already have an account? "
          linkName="Login here"
          linkUrl="/"
        />
        <SignUpPortal />
      </div>
    </div>
  );
}
