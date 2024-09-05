import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api",
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
      query: (genre) => `/songs/genre?style=${genre}`,
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
