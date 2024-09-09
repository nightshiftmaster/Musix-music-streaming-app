import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../assets/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_API_URL}/api`,
});

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery,
  endpoints: (builder) => ({
    getSongDetails: builder.query({
      query: (songId) => {
        return `/songs/${songId}`;
      },
    }),
    getSongsByGenre: builder.query({
      query: (genre) => `/`,
    }),

    getArtistDetails: builder.query({
      query: (artistId) => `/artists/id/${artistId}`,
    }),
    getArtistBySearch: builder.query({
      query: (name) => `/artists/name/${name}`,
    }),

    getSongsBySearch: builder.query({
      query: (query) => `/artists/search?q=${query}`,
    }),
  }),
});

export const {
  useGetSongDetailsQuery,
  useGetSongsByGenreQuery,
  useGetArtistDetailsQuery,
  useGetSongsBySearchQuery,
  useGetArtistBySearchQuery,
} = shazamCoreApi;
