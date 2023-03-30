import React from "react";
import LoginHeader from "../Components/LoginHeader";

import LoginPortal from "../Components/LoginPortal";

export default function LoginPage() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginHeader
          heading="Login to WormComms"
          paragraph="Dont have an account yet? "
          linkName="Signup here"
          linkUrl="/signup"
        />
        <LoginPortal />
      </div>
    </div>
  );
}
