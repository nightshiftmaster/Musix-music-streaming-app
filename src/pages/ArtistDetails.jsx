import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { id: artistId } = useParams();
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    isError,
  } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtistDetails) return;
  <Loader title="Searching artist details" />;

  if (isError) return <Error />;

  const artist = artistData.data[0];

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artist} />
      <RelatedSongs
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={artistId}
        data={artist.views["top-songs"].data}
      />
    </div>
  );
};

export default ArtistDetails;
