import useMyList from "@/hooks/useMyList";
import { postUserSelectedMovieList } from "@/services/movieService";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const MovieCardDetails = ({
  selectedMovie,
  setShowOverlay,
  selectedMovieData,
}: any) => {
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [trailer, setTrailer] = useState("");
  const pathName = usePathname();
  console.log(pathName);

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        if (pathName === "/my-list") {
          if (selectedMovieData) {
            setMovieDetails(selectedMovieData);
            setTrailer(selectedMovieData?.trailer);
          } else {
            console.log("Selected movie data not found.");
          }
        } else {
          const url = `https://mdblist.p.rapidapi.com/?tm=${selectedMovie}`;
          const options = {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "3ea5dec37fmsh3b16d26a346fed5p1d2bb9jsn9efa3e78f45e",
              "X-RapidAPI-Host": "mdblist.p.rapidapi.com",
            },
          };
          const response = await fetch(url, options);
          const result = await response.json();
          setMovieDetails(result);
          setTrailer(result.trailer);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovieDetails();
  }, [selectedMovie, pathName, selectedMovieData]);

  const overlayHandler = () => {
    setTrailer("");
    setShowOverlay(false);
  };

  const myListHandler = () => {
    if (movieDetails) {
      postUserSelectedMovieList(movieDetails, userId);
    }
    setShowOverlay(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-10 bg-black bg-opacity-50  flex items-center"
        role="button"
        onClick={overlayHandler}
      >
        <div className="w-full z-20 bg-black mx-20 rounded">
          {trailer && (
            <div className="w-full h-50">
              <ReactPlayer
                url={trailer}
                width={"100%"}
                height={500}
                className="z-20"
              />
            </div>
          )}
          {movieDetails && (
            <div
              className=" bg-gray-800  overflow-hidden shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h1 className="text-3xl text-white font-semibold mb-2">
                  {movieDetails.title}
                </h1>
                <p className="text-lg text-gray-400 mb-4">
                  {movieDetails.released}
                </p>
                <p className="text-lg text-white mb-4">
                  {movieDetails.description}
                </p>
                <div className="flex justify-center">
                  <button
                    className="bg-red-600 hover:bg-black text-white px-6 py-2 rounded-full"
                    onClick={myListHandler}
                  >
                    Add to List
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieCardDetails;
