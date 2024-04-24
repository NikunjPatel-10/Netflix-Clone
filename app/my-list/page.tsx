"use client";
import MovieCard from "@/components/MovieCard";
import MovieCardDetails from "@/components/MovieCardDetails";
import useMyList from "@/hooks/useMyList";
import { deleteUserSelectedMovieList } from "@/services/movieService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [myMovieList, setMyMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const userId = localStorage.getItem("userId");
  const router = useRouter();

  const moviedata = useMyList();
  const selectedMovieData = moviedata.find(
    (movie: any) => movie.id === selectedMovie
  );

  /**
   * for delete the userMovie-list
   * @param dataId
   */
  const deleteUserSelectedMovieListHandler = async (dataId: any) => {
    try {
      await deleteUserSelectedMovieList(userId, dataId);
      // After successful deletion, update the movie list
      const updatedMovieList = myMovieList.filter(
        (movie: any) => movie.dataId !== dataId
      );
      setMyMovieList(updatedMovieList);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  useEffect(() => {
    setMyMovieList(moviedata);
    setShowCloseIcon(true);
  }, [moviedata]);

  useEffect(() => {
    // Show close icon only when a movie is selected
    setShowCloseIcon(!!selectedMovie);
  }, [selectedMovie]);

  return (
    <div className="m-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {myMovieList.map((movie: any) => (
          <MovieCard
            key={movie.id}
            cardDetails={movie}
            setSelectedMovie={setSelectedMovie}
            setShowOverlay={setShowOverlay}
            showCloseIcon={showCloseIcon}
            onDeleteUserSelectedMovieList={deleteUserSelectedMovieListHandler}
          />
        ))}
      </div>

      {showOverlay && (
        <MovieCardDetails
          selectedMovieData={selectedMovieData}
          selectedMovie={selectedMovie}
          setShowOverlay={setShowOverlay}
        />
      )}
    </div>
  );
};

export default Page;
