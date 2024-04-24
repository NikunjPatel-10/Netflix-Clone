import React, { useState } from "react";
import { useEffect } from "react";
import { getUserSelectedMovieList } from "../services/movieService";
import { title } from "process";

const useMyList = () => {
  const [mymovieList, setMyMovieList] = useState<any>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getUserSelectedMovieList(userId).then((response) => {
      const responseData = [];

      for (const key in response.data) {
        const id = key;

        const userList = {
          dataId: key,
          id: response.data[id].tmdbid,
          title: response.data[id].title,
          trailer: response.data[id].trailer,
          poster: response.data[id].poster,
          description: response.data[id].description,
          backdrop: response.data[id].backdrop,
          released: response.data[id].released,
        };

        responseData.push(userList);
      }
      setMyMovieList(responseData);
    });
  }, []);

  return mymovieList;
};

export default useMyList;
