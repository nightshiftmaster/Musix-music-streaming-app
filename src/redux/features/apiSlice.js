import { createSlice, current } from "@reduxjs/toolkit";
import { data } from "../../assets/dataForFakeApi";

const initialState = {
  allData: {
    discover: data.charts,
    songs: data.songs,
    artists: data.artists,
  },
  currSong: [],
  searchResults: [],
  data: [],
  artist: [],
  countryCode: "",
  isFetching: false,
  error: false,
};

const apiSlice = createSlice({
  name: "fake api",
  initialState,
  reducers: {
    getSongDetails: (state, action) => {
      state.currSong = [];
      const songid = action.payload;

      const song = state?.allData?.songs.filter((song) =>
        song.hasOwnProperty(songid)
      );
      const currSong = Object.values(state?.allData?.discover)
        .flat()
        .find(({ id }) => id === songid);
      if (!currSong) {
        const topSongs = state.allData.artists.map((artist) => {
          const value = Object.values(artist);
          const songs = value[0].data[0].views["top-songs"];
          return songs;
        });

        const topSong = topSongs.flat().find((song) => {
          return song.id === songid;
        });
        state.topSongs = topSong;
      }

      const songData = song[0] && Object.values(song[0])[0];

      state.currSong = [
        ...state.currSong,
        {
          songData,
          songDetails: currSong ? currSong : state.topSongs,
        },
      ];
    },

    getSongsByGenre: (state, action) => {
      state.error = false;
      const { payload } = action;
      state.data = state.allData?.discover[payload];
    },
    getTopCharts: (state) => {
      state.data = state.allData?.topCharts;
    },
    getSongsByCountry: (state, action) => {
      const { payload } = action;
      state.data = state.allData.discover[payload];
    },
    getArtistDetails: (state, action) => {
      const artistId = action.payload;
      const currArtist = state.allData?.artists.find((artist) => {
        return artist.hasOwnProperty(Number(artistId));
      });
      if (!currArtist) {
        state.error = true;
      } else {
        state.error = false;
        state.artist = Object.values(currArtist);
      }
    },
    getSearch: (state, action) => {
      const searchTerm = action.payload;
      state.artist = state.allData?.artists.find((artist) => {
        const artistName = Object.values(artist)[0].data[0].attributes.name;
        return (
          artistName === searchTerm ||
          artistName.startsWith(
            searchTerm[0].toUpperCase() + searchTerm.slice(1)
          )
        );
      });
    },
    searchData: (state, action) => {
      const { payload } = action;

      const result = state.allData.artists.filter((artist) => {
        return Object.values(artist)[0].data[0].attributes.name.startsWith(
          payload[0].toUpperCase() + payload.slice(1)
        );
      });
      state.searchResults = result;
    },
    setCountryCode: (state, action) => {
      const { payload } = action;
      state.countryCode = payload;
    },
  },
});

export const {
  setCountryCode,
  searchData,
  getSongsByGenre,
  getSongDetails,
  getSongsByCountry,
  getArtistDetails,
  getSearch,
} = apiSlice.actions;

export default apiSlice.reducer;
