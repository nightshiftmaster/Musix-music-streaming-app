import { Link } from "react-router-dom";
import { useEffect } from "react";

const DetailsHeader = ({ artistId, artistData, songData, setLink, link }) => {
  const artist = artistData?.attributes;
  useEffect(() => {
    setLink(!link);
    return;
  }, [songData, artistData]);
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-24 mt-6">
        <div className="inset-0 flex items-center">
          <img
            src={artistId ? artist.artwork.url : songData?.images?.coverart}
            alt="art"
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black  "
          />
          <div className="ml-5">
            <p className="font-bold sm:text-3xl text-xl text-white">
              {artistId ? artist?.name : songData?.title}
            </p>
            {!artistId && (
              <Link to={`/artists/${songData?.artists[0].adamid}`}>
                <p className="text-base text-gray-400 mt-2">
                  {songData?.subtitle}
                </p>
              </Link>
            )}
            <p className="text-base text-gray-400 mt-2">
              {artistId ? artist?.genreNames[0] : songData?.genres?.primary}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full sm:h-20 h-10"></div>
      <div>
        {artistId ? (
          <div
            className="text-gray-400 text-base mb-11"
            dangerouslySetInnerHTML={{ __html: artist?.artistBio }}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default DetailsHeader;
