import { baseUrl } from "@/environment/environment";
import axios from "axios";

// export const getHomePageData = async () => {
//   return await axios.get(`${baseUrl}netflix-clone/home.json`);
// };

// export const getAllMoviesPageData = async () => {
//   return await axios.get(`${baseUrl}/netflix-clone/movies.json`);
// };

// export const getAllShowPageData = async () => {
//   return await axios.get(`${baseUrl}/netflix-clone/shows.json`);
// };

export const postUserSelectedMovieList = async (data: any, id: any) => {
  return await axios
    .post(`${baseUrl}netflix-clone/users/${id}/my-list.json`, { ...data })
    .then((res) => {
      console.log(res);
    });
};

export const getUserSelectedMovieList = async (id: any) => {
  return await axios.get(`${baseUrl}netflix-clone/users/${id}/my-list.json`);
};

export const deleteUserSelectedMovieList = async (userId: any, dataId: any) => {
  return await axios.delete(
    `${baseUrl}netflix-clone/users/${userId}/my-list/${dataId}.json`
  );
};
