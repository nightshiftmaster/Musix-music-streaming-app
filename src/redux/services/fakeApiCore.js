import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getFakeSongsByGenre,
  getFakeTopCharts,
  getFakeSongsByCountry,
  getFakeArtistDetails,
  getFakeSearch,
} from "../features/fakeApiSlice";

const useGetSongsByGenreQuery = (genreListId) => {
  const dispatch = useDispatch();
  const { data, isFetching, error } = useSelector((state) => state.fakeApi);
  useEffect(() => {
    dispatch(getFakeSongsByGenre(genreListId || "POP"));
  }, [data, genreListId]);
  return { data, isFetching, error };
};

const useGetTopChartsQuery = () => {
  const dispatch = useDispatch();
  const { data, isFetching, error } = useSelector((state) => state.fakeApi);
  useEffect(() => {
    dispatch(getFakeTopCharts());
  }, []);

  return { data, isFetching, error };
};

const useGetSongsByCountryQuery = (country) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFakeSongsByCountry(country));
  }, []);
  const { data, isFetching, error } = useSelector((state) => state.fakeApi);
  return { data, isFetching, error };
};

const useGetArtistDetailsQuery = (artistId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFakeArtistDetails(artistId));
  }, [artistId]);

  const { artist, isFetching, error } = useSelector((state) => {
    return state.fakeApi;
  });
  const data =
    artist &&
    useSelector((state) => {
      return state.fakeApi.allData.artistData;
    });

  return { data, isFetching, error };
};

const useGetSongsBySearchQuery = (searchTerm) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFakeSearch(searchTerm));
  }, [searchTerm]);

  const { artist, isFetching, error } = useSelector((state) => {
    return state.fakeApi;
  });

  return { data: artist, isFetching, error };
};

export {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetArtistDetailsQuery,
  useGetSongsBySearchQuery,
};
