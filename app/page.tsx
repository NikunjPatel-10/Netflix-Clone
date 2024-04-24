"use client";
import MovieCard from "@/components/MovieCard";
import MovieCardDetails from "@/components/MovieCardDetails";
import axios from "axios";
// import { getHomePageData } from "@/services/movieService";
import { useEffect, useState } from "react";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<any>([]);
  const [animationMovies, setAnimationMovies] = useState<any>([]);
  const [newMovies, setNewMovies] = useState<any>([]);
  // const [movieCategory, setMovieCategory] = useState<any>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(0);
  const [showOverlay, setShowOverlay] = useState<any>(false);
  useEffect(() => {
    async function getHomeData() {
      const response = await axios.get("/api/home");

      const id = Object.keys(response.data)[0];
      const moviedata = response.data[id];
      // setMovieCategory(moviedata);
      setTrendingMovies(moviedata[0].movies);
      setNewMovies(moviedata[1].movies);
      setAnimationMovies(moviedata[2].movies);
      // console.log(moviedata[0].movies);
    }
    getHomeData();
  }, []);

  //     // const apiKey = "072a7e7bcaae267423914f430e95a991"; // Replace "YOUR_API_KEY_HERE" with your actual TMDB API key

  return (
    <div className="px-4 ">
      <h2 className="text-white py-3">Animation Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {animationMovies.map((res: any) => {
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
      <h2 className="text-white py-3">Trending movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {trendingMovies.map((res: any) => {
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
      <h2 className="py-3 text-white">New movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {newMovies.map((res: any) => {
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
}
