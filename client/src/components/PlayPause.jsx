import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";

const PlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) => {
  const isActiveRealtedSong = activeSong?.title === song?.title;
  const isActiveSong = activeSong?.attributes?.name === song?.attributes?.name;
  return isPlaying && isActiveRealtedSong && isActiveSong ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  );
};

export default PlayPause;
