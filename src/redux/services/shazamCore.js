import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// inactive api !!!

const baseQuery = fetchBaseQuery({
  baseUrl: "https://shazam-core.p.rapidapi.com",
  prepareHeaders: (headers) => {
    headers.set(
      "X-RapidAPI-Key",
      import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY
    );
    return headers;
  },
});

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery,
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/v1/charts/world",
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => {
        const apiVersion = songid.startsWith("1") ? "v2" : "v1";
        return `/${apiVersion}/tracks/details?track_id=${songid}`;
      },
    }),
    getSongsByGenre: builder.query({
      query: (genre) =>
        `/v1/charts/genre-world?genre_code=${genre}&country_code=DZ&limit=10`,
    }),
    getRelatedSongs: builder.query({
      query: ({ songid }) => `/v1/tracks/related?offset=0&track_id=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/v2/artists/details?artist_id=${artistId}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `v1/charts/country?country_code=${countryCode}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `/v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongsByGenreQuery,
  useGetRelatedSongsQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
