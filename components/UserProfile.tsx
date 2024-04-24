import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import React, { memo, useEffect } from "react";

const UserProfile = () => {
  // const { user }: any = useAuth0();
  const { user }: any = useUser();

  // console.log(user.sub.split("|")[1]);

  /**
   * set userId in local storage
   */
  localStorage.setItem("userId", user.sub.split("|")[1]);

  return (
    // fetch and display user data
    <>
      {user && (
        <div
          className="bg-white rounded shadow-md max-w-xs mx-auto relative"
          data-te-toggle="tooltip"
          data-te-placement="left"
          data-te-ripple-init
          data-te-ripple-color="light"
          title={user.name}
        >
          <div className="flex items-center justify-center w-10 h-10">
            <img
              src={user.picture}
              alt="User profile"
              className="w-full h-full rounded"
            />
            {/* show tooltip on hover of profile with user name */}
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
