import SongBar from "./SongBar";

const RelatedSongs = ({
  isPlaying,
  activeSong,
  data,
  handlePauseClick,
  handlePlayClick,
  artistId,
}) => {
  return (
    <div className="flex flex-col" data-testid="related-songs">
      <h1 className="font-bold text-3xl text-white mb-4">
        {artistId ? "Top Songs" : "Related Songs"}
      </h1>
      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => {
          const currArtistId = artistId
            ? artistId
            : song?.relationships?.artists.data[0].id;
          return (
            <SongBar
              key={`${song.key}-${artistId}-${i}`}
              song={song}
              i={i}
              artistId={currArtistId}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedSongs;
