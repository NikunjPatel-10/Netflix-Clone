"use client";
import MovieCard from "@/components/MovieCard";
import MovieCardDetails from "@/components/MovieCardDetails";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { getAllMoviesPageData } from "@/services/movieService";

const page = () => {
  const [movieList, setMovieList] = useState<any>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(0);
  const [showOverlay, setShowOverlay] = useState<any>(false);
  useEffect(() => {
    async function moviesList() {
      // const response = await getAllMoviesPageData();
      const response = await axios.get("/api/movies");
      const movieList = response.data;

      const id = Object.keys(movieList)[0];
      const movieData = response.data[id];
      setMovieList(movieData.movies);
    }
    moviesList();
  }, []);

  return (
    <div className="m-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {movieList.map((res: any) => {
          // console.log(res);
          return (
            <MovieCard
              key={res._id}
              cardDetails={res}
              setSelectedMovie={setSelectedMovie}
              setShowOverlay={setShowOverlay}
            />
          );
        })}
      </div>

      {showOverlay && (
        <MovieCardDetails
          selectedMovie={selectedMovie}
          setShowOverlay={setShowOverlay}
        />
      )}
    </div>
  );
};

export default page;
