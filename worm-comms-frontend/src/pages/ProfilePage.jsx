import React from "react";
import LoginHeader from "../Components/LoginHeader";
import ProfilePortal from "../Components/ProfilePortal";


export default function ProfilePage() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginHeader
          heading="Update your account profile"
          paragraph=" "
          linkName=" "
          linkUrl=" "
        />
        < ProfilePortal/>
      </div>
    </div>
  );
}