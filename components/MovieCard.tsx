"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

const MovieCard = ({
  cardDetails,
  setSelectedMovie,
  setShowOverlay,
  showCloseIcon,
  onDeleteUserSelectedMovieList,
}: any) => {
  const { user } = useUser();
  const router = useRouter();

  /**
   * To display the detail of the movie
   */
  const cardDetailsHandler = () => {
    if (user) {
      if (cardDetails) {
        if (cardDetails._id) {
          setSelectedMovie(cardDetails._id);
        } else if (cardDetails.id) {
          setSelectedMovie(cardDetails.id);
        }
      }
      setShowOverlay(true);
    } else {
      router.push("/api/auth/login");
    }
  };

  /**
   * for delete the movie-list
   * @param e
   */
  const closeIconHandler = (e: any) => {
    e.stopPropagation();
    onDeleteUserSelectedMovieList(cardDetails.dataId);
  };

  return (
    <>
      <div
        className="max-w-xs mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg relative group"
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
        role="button"
        onClick={cardDetailsHandler}
      >
        {showCloseIcon && (
          <div className="absolute top-2 right-2 group-hover:block hidden">
            <div className="rounded-full bg-gray-700 p-2 hover:bg-gray-600 ">
              <XMarkIcon
                className="text-white h-6 w-6 cursor-pointer"
                onClick={(e) => closeIconHandler(e)}
              />
            </div>
          </div>
        )}

        {cardDetails.poster ? (
          <img
            className="w-full object-contain"
            src={cardDetails.poster}
            alt="Movie"
          />
        ) : (
          <img
            className="w-full object-contain"
            src={cardDetails.poster_path}
            alt="Movie"
          />
        )}

        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-gray-900 to-transparent w-full h-16"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-lg text-white font-semibold">
            {cardDetails.title}
          </h3>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
