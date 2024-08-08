import { Error, Loader, ArtistCard } from "../components";
// import { useGetSongsByGenreQuery } from "../redux/services/shazamCore"; // production api
import { useSelector } from "react-redux";

import { useGetSongsByGenreQuery } from "../redux/services/fakeApiCore"; // tests api

import _ from "lodash";

import React from "react";

const TopArtists = () => {
  const { genreListId } = useSelector((state) => state.player);

  const { data, isFetching, isError } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  if (isFetching) {
    return <Loader title="Loading top charts" />;
  }

  if (isError) return <Error />;

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-wrap justify-around gap-8 mt-2"
        data-testid="artists-bar"
      >
        {data?.slice(0, 20).map((track, i) => (
          <ArtistCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
