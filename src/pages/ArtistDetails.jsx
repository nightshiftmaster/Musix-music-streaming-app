import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetArtistDetailsQuery,
  useGetSongsBySearchQuery,
} from "../redux/services/shazamCore";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const ArtistDetails = ({ setLink, link }) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { id: artistId } = useParams();

  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    isError,
  } = useGetArtistDetailsQuery(artistId);

  const artist = artistData?.data[0];

  const { data, isFetching, error } = useGetSongsBySearchQuery(
    artist?.attributes.name
  );

  if (isFetchingArtistDetails || isFetching) {
    return <Loader title="Searching artist details" />;
  }

  if (isError || error) return <Error />;

  const songs = data?.tracks?.hits?.map((song) => song.track);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(playPause(true));
    dispatch(setActiveSong({ song, i, data }));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artist}
        setLink={setLink}
        link={link}
      />
      <RelatedSongs
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={artistId}
        data={songs}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;
