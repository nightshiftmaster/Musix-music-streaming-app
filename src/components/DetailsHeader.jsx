import { Link } from "react-router-dom";
import { useEffect } from "react";

const DetailsHeader = ({ artistId, artistData, songData, setLink, link }) => {
  const artist = artistData?.data[0];

  const songImageUrl = artistData
    ? artist.avatar
    : songData?.attributes?.artwork?.url;

  const songTitle = artist
    ? artist?.attributes?.name
    : songData?.attributes?.name;

  const songSubtitle = songData?.attributes?.artistName;

  useEffect(() => {
    setLink(!link);
    return;
  }, [songData, artistData]);

  return (
    <div className="relative w-full flex flex-col" data-testid="details-header">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-24 mt-6">
        <div className="inset-0 flex items-center">
          <img
            src={songImageUrl}
            alt="art"
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black  "
          />
          <div className="ml-5">
            <p className="font-bold sm:text-3xl text-xl text-white">
              {songTitle}
            </p>

            <Link
              to={`/artists/${songData?.relationships?.artists.data[0].id}`}
            >
              <p className="text-base text-gray-400 mt-2">{songSubtitle}</p>
            </Link>

            <p className="text-base text-gray-400 mt-2">
              {artist?.attributes?.genreNames[0]}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full sm:h-20 h-10"></div>
      <div>
        {artistId && artist?.attributes?.artistBio ? (
          <div>
            <h1 className="text-2xl font-bold text-white mb-5">About</h1>
            <div
              className="text-gray-400 text-base mb-11"
              dangerouslySetInnerHTML={{
                __html: artist?.attributes?.artistBio,
              }}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default DetailsHeader;
