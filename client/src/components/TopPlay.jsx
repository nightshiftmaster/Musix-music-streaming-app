import { Link } from "react-router-dom";
import { SongBar } from ".";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../redux/services/apiCore"; // api for production
import { Error, Loader } from ".";

// import {
//   useGetSongsByGenreQuery,
//   useGetSongsByCountryQuery,
// } from "../redux/services/testApiCore"; // api for tests

import "swiper/css";
import "swiper/css/free-mode";

const TopPlay = ({ link, setLink }) => {
  const dispatch = useDispatch();
  const { countryCode } = useSelector((state) => state.api);

  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  const topPlays = data?.slice(0, 20);

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, i, data }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFetching) {
    return <Loader title="Loading songs" />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
      data-testid="top-play"
    >
      <div className="w-full flex flex-col mb-4">
        <div className="flex flex-row justify-between items-center mb-2">
          <h2 className="text-white font-bold text-2">Top Artists</h2>
          <Link to="/top-artists">
            <p
              onClick={() => setLink(!link)}
              className="text-gray-300 text-base cursor-pointer"
            >
              See more
            </p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => {
            return (
              <SwiperSlide
                key={song?.id}
                style={{ width: "25%", height: "auto" }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link
                  to={`/artists/${song?.relationships?.artists?.data[0].id} `}
                >
                  <img
                    src={song?.attributes?.artwork?.url}
                    alt="name"
                    className="rounded-full w-full object-cover"
                  />
                </Link>
              </SwiperSlide>
            );
          }) || (
            <div className="flex">
              {[1, 2, 3, 4].map((song, i) => {
                return (
                  <div
                    className="shadow-lg rounded-full animate-slideright"
                    key={i}
                  >
                    <div className="bg-slate-400 animate-pulse h-16 w-16 rounded-full m-2"></div>
                  </div>
                );
              })}
            </div>
          )}
        </Swiper>
      </div>
      <div className="sm:w-full w-[[calc(100%-400px)]]  flex flex-col">
        <div className="flex flex-row justify-between items-center mt-5 mb-2">
          <h2 className="text-white font-bold text-2">Top Charts</h2>
          <Link to="/top-charts">
            <p
              onClick={() => setLink(!link)}
              className="text-gray-300 text-base cursor-pointer"
            >
              See more
            </p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1 xl:h-screen xl:pb-80 overflow-x-hidden overflow-y-scroll hide-scrollbar">
          {topPlays?.map((song, i) => (
            <SongBar
              key={song.id}
              song={song}
              i={i}
              artistId={song?.relationships?.artists?.data[0].id}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          )) || (
            <div className="flex flex-col ">
              {[1, 2, 3, 4].map((song, i) => (
                <div
                  className="shadow-lg rounded-full animate-slideright"
                  key={i}
                >
                  <div className="bg-slate-400 animate-pulse h-16 w-26 rounded-md m-2"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopPlay;
