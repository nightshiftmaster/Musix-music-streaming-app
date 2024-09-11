import { React } from "react";
import { Link, useNavigate } from "react-router-dom";

import PlayPause from "./PlayPause";

const SongBar = ({
  song,
  i,
  isPlaying,
  activeSong,
  artistId,
  handlePauseClick,
  handlePlayClick,
}) => {
  const navigate = useNavigate();

  const songImageUrl = song?.images
    ? song?.images?.coverart
    : song?.attributes?.artwork?.url;
  const songTitle = song?.title ? song?.title : song?.attributes?.name;
  const songSubtitle = song?.subtitle
    ? song?.subtitle
    : song?.attributes?.artistName;

  return (
    <div className="md:w-full w-[calc(100vw-50px)] flex items-center hover:bg-[#4c426e] py-1 p-1 rounded-lg cursor-pointer mb-1">
      <h3 className="w-4 text-right font-bold text-base text-white mr-3">
        {i + 1}
      </h3>

      <img
        onClick={() => navigate(`/songs/${song?.id ? song?.id : song?.key}`)}
        className="w-20 h-20 rounded-lg"
        src={songImageUrl}
        alt={song?.title}
      />

      <div className="flex-1 flex-col items-center justify-start overflow-hidden">
        <div className="flex-1 flex-col items-center justify-start mx-3">
          <p
            className="font-semibold md:text-lg text-md text-white truncate hover:underline"
            onClick={() =>
              navigate(`/songs/${song?.id ? song?.id : song?.key}`)
            }
          >
            {songTitle}
          </p>
        </div>
        <div className=" flex-1 flex-col items-center justify-start mx-3 ">
          <Link to={`/artists/${artistId}`}>
            <p className="text-sm text-gray-400 mt-1 truncate hover:underline">
              {songSubtitle}
            </p>
          </Link>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
      />
    </div>
  );
};
export default SongBar;
