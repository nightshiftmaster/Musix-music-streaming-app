import { useNavigate } from "react-router-dom";

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col w-[250px] p-4 hover:bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      data-testid="artist-card"
      onClick={() =>
        navigate(
          `/artists/${
            track?.artists
              ? track?.artists[0].adamid
              : track?.relationships?.artists?.data[0]?.id
          }`
        )
      }
    >
      <img
        className="rounded-full"
        alt="artist"
        src={track?.attributes?.artwork?.url}
      />
      <p className="mt-4 font-semibold text-center text-lg text-white truncate">
        {track?.subtitle ? track?.subtitle : track?.attributes?.artistName}
      </p>
    </div>
  );
};

export default ArtistCard;
