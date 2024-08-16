import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error, Loader, SongCard } from "../components";
// import { useGetSongsBySearchQuery } from "../redux/services/shazamCore"; // production api
import { useGetSongsBySearchQuery } from "../redux/services/apiCore"; // test api
import { useEffect, useRef } from "react";
import React from "react";
import { Link } from "react-router-dom";

const Search = ({ setLink, link }) => {
  const { searchTerm } = useParams();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, isError } = useGetSongsBySearchQuery(searchTerm);

  useEffect(() => {
    setLink(!link);
  }, [data]);

  if (data.length === 0) return;

  const songs = Object.values(data)[0].data[0].views["top-songs"].map(
    (song) => song
  );

  const artistId = Object.keys(data);

  if (isError) return <Error title="Artist not exists" />;

  return (
    <div className="flex flex-col" data-testid="search-page">
      <h2
        className="font-bold text-2xl mb-7 text-white text-left w-full items-center flex-col
    xl:flex-row flex mt-6 md:mb-10"
      >
        Showing results for {"   "}
        <Link to={`/artists/${artistId}`}>
          <span className="ml-[7px] underline text-2xl italic">
            {searchTerm}
          </span>
        </Link>
      </h2>

      <div className="flex flex-wrap justify-around gap-8">
        {songs?.map((song, i) => (
          <SongCard
            key={i}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songs}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
