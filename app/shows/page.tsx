"use client";
import MovieCard from "@/components/MovieCard";
import MovieCardDetails from "@/components/MovieCardDetails";
import axios from "axios";
// import { getAllShowPageData } from "@/services/movieService";
import React, { useEffect, useState } from "react";

const page = () => {
  const [showList, setShowList] = useState<any>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(0);
  const [showOverlay, setShowOverlay] = useState<any>(false);
  useEffect(() => {
    async function showLists() {
      // const response = await getAllShowPageData();
      const response = await axios.get("/api/shows");
      const allShow = response.data;
      const id = Object.keys(allShow)[0];
      const showList = response.data[id];
      setShowList(showList.movies);
    }
    showLists();
  }, []);

  return (
    <div className="m-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {showList.map((res: any) => {
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
