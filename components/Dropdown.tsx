import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import React from "react";

const Dropdown = () => {
  const { user }: any = useUser();

  return (
    <div className="absolute top-full right-[-60%] bg-[#e31e1b]  shadow-md rounded-md mt-1">
      {/* <p className="px-4 py-2 text-gray-800 text-sm">{user.name}</p> */}
      <Link
        href="/api/auth/logout"
        className="block px-3 py-1 text-white hover:bg-white-200"
      >
        Logout
      </Link>
    </div>
  );
};

export default Dropdown;
