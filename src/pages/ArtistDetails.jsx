import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetArtistDetailsQuery,
  useGetSongsBySearchQuery,
} from "../redux/services/shazamCore";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
// import {
//   useGetArtistDetailsQuery,
//   useGetSongsBySearchQuery,
// } from "../redux/services/apiCore"; // tests api
import { useEffect, useState } from "react";

const ArtistDetails = ({ setLink, link }) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { discover } = useSelector((state) => {
    return state.api.allData;
  });

  const { id: artistId } = useParams();

  const {
    data: artist,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);

  console.log(artist);

  if (isFetchingArtistDetails) {
    return <Loader title="Searching artist details" />;
  }

  if (error) return <Error />;

  const topSongs = artist[0]?.topSongs[0];

  // const songs = data?.tracks?.hits?.map((song) => song.track);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(playPause(true));
    dispatch(setActiveSong({ song, i, discover }));
  };

  return (
    <div className="flex flex-col" data-testid="artist-details">
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
        artist={artist}
        data={topSongs}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;
