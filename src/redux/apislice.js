import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMBD_TOKEN;

const apiSlice = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    method:"GET",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${TMDB_TOKEN}`);
      headers.set("accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBackgroundImage:builder.query({
      query:()=>({
        url:"/movie/upcoming"
      })
    })})
});

export const {useGetBackgroundImageQuery} = apiSlice
export default apiSlice