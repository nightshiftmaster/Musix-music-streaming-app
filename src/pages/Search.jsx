import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";
import { useEffect, useRef } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";

const Search = ({ setLink, link }) => {
  const divRef = useRef(null);

  const { searchTerm } = useParams();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, isError } = useGetSongsBySearchQuery(searchTerm);

  useEffect(() => {
    // divRef?.current?.scrollIntoView({ behavior: "smooth" });
    setLink(!link);
  }, [data]);

  const songs = data?.tracks?.hits?.map((song) => song.track);

  const artistId = data?.tracks?.hits[0].track?.artists[0].adamid;

  if (isFetching) return <Loader title="Loading results" />;

  if (isError) return <Error title="Artist not exists" />;

  return (
    <div className="flex flex-col">
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
            key={song.key}
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
