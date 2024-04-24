"use client";
import Link from "next/link";
import React, { useState } from "react";
import NetflixLogo from "./../public/assets/netflix.png";
import Image from "next/image";
import UserProfile from "./UserProfile";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ChevronDoubleDownIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Dropdown from "./Dropdown";

const Header = () => {
  const { user } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className=" px-3 shadow w-full flex justify-between ">
        <div className="flex">
          <figure className="w-16">
            <Link href={"/"}>
              <Image src={NetflixLogo} alt="nextflix.png" />
            </Link>
          </figure>
          <div className="flex justify-center items-center px-5">
            <Link href="/" className="px-3 text-white">
              Home
            </Link>
            <Link href="/movies" className="px-3 text-white">
              Movies
            </Link>
            {/* <Link href="/shows" className="text-white px-3">
              Shows
            </Link> */}
            {user && (
              <Link href="/my-list" className="text-white px-3">
                My List
              </Link>
            )}
          </div>
        </div>
        <div className=" me-4" onClick={toggleDropdown}>
          {user ? (
            <div className="flex ">
              <UserProfile />
              <div className="cursor-pointer flex items-end relative">
                <ChevronDownIcon className="h-8 text-white " />
                {isDropdownOpen && <Dropdown />}
              </div>
            </div>
          ) : (
            <Link
              href="/api/auth/login"
              className="bg-[#e31e1b] text-white px-4 py-2 rounded"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
