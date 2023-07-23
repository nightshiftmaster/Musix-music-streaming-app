import React from "react";
import { Link } from "react-router-dom";

import PlayPause from "./PlayPause";

const SongBar = ({
  song,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div className="md:w-full w-[calc(100vw-50px)] flex items-center hover:bg-[#4c426e] py-1 p-1 rounded-lg cursor-pointer mb-1">
      <h3 className="w-4 text-right font-bold text-base text-white mr-3">
        {i + 1}
      </h3>
      <Link to={`songs/${song.key}`}>
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.images.coverart}
          alt={song?.title}
        />
      </Link>
      <div className="flex-1 flex-col items-center justify-start overflow-hidden">
        <div className="flex-1 flex-col items-center justify-start mx-3">
          <Link to={`songs/${song.key}`}>
            <p className="font-semibold md:text-lg text-md text-white truncate">
              {song?.title}
            </p>
          </Link>
        </div>
        <div className=" flex-1 flex-col items-center justify-start mx-3">
          <Link to={`artists/${song?.artists[0].adamid}`}>
            <p className="text-sm text-gray-400 mt-1 truncate">
              {song?.subtitle}
            </p>
          </Link>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

export default SongBar;
