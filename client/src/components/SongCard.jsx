import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({
  song,
  isPlaying,
  artistId,
  data,
  activeSong,
  i,
  discover,
}) => {
  const dispatch = useDispatch();
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  return (
    <div
      className={`flex flex-col ${
        discover ? "w-[170px] h-[230px]" : "w-[250px]"
      }  p-3 bg-white/5 rounded-lg cursor-pointer`}
      data-testid="song-card"
    >
      <div className="relative w-30 h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.attributes?.name === song?.attributes?.name &&
            activeSong.title === song?.title
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          src={
            song?.images
              ? song?.images?.coverart
              : song?.attributes?.artwork?.url
          }
          alt="song_img"
          className="w-full object-contain "
        />
      </div>
      <div className="flex flex-col">
        <p className="font-semibold lg:text-lg text-white truncate mt-2 text-md">
          <Link to={`/songs/${song?.id}`}>
            {song?.attributes ? song?.attributes?.name : song?.title}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-400 mt-1">
          <Link to={`/artists/${artistId ? artistId : song?.artists[0]?.id}`}>
            {song?.attributes ? song?.attributes?.artistName : song?.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
