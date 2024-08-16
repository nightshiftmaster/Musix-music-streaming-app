import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getSongsByGenre,
  getSongDetails,
  getSongsByCountry,
  getArtistDetails,
  getSearch,
} from "../features/apiSlice";

const useGetSongsByGenreQuery = (genreListId) => {
  const dispatch = useDispatch();
  const { data, isFetching, error } = useSelector((state) => state.api);
  useEffect(() => {
    dispatch(getSongsByGenre(genreListId || "POP"));
  }, [genreListId]);
  return { data, isFetching, error };
};

const useGetSongsByCountryQuery = (country) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSongsByCountry(country));
  }, [country]);
  const { data, isFetching, error } = useSelector((state) => {
    return state.api;
  });

  return { data, isFetching, error };
};

const useGetSongDetailsQuery = (songid) => {
  const { genreListId } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  useEffect(() => {
    if (songid) {
      dispatch(getSongDetails(songid));
      return;
    }
  }, [songid, dispatch]);

  const {
    currSong: data,
    isFetching,
    error,
  } = useSelector((state) => {
    return state.api;
  });

  return { data, isFetching, error };
};

const useGetArtistDetailsQuery = (artistId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistDetails(artistId));
  }, [artistId, dispatch]);

  const { artist, isFetching, error } = useSelector((state) => {
    return state.api;
  });
  return { artist, isFetching, error };
};

const useGetSongsBySearchQuery = (searchTerm) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearch(searchTerm));
  }, [searchTerm]);

  const { artist, isFetching, error } = useSelector((state) => {
    return state.api;
  });

  return { data: artist, isFetching, error };
};

export {
  useGetSongDetailsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetArtistDetailsQuery,
  useGetSongsBySearchQuery,
};
