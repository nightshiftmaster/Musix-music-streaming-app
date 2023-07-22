import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { Error, Loader, SongCard } from "../components";

import "swiper/css";
import "swiper/css/free-mode";
import { TopCharts } from "../pages";

const TopChartsCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div className=" md:w-full  w-[calc(100vw-50px)] flex items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="fot-bold text-base text-white mr-3">{i + 1}</h3>
      <Link to={`songs/${song.key}`}>
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.images.coverart}
          alt={song?.title}
        />
      </Link>
      <div className="flex-1 flex-col items-center justify-start overflow-hidden">
        <div className="flex-1 flex-col items-center justify-start mx-3">
          <Link to={`songs/${song.key}`}>
            <p className="font-semibold text-lg text-white truncate">
              {song?.title}
            </p>
          </Link>
        </div>
        <div className=" flex-1 flex-col items-center justify-start mx-3">
          <Link to={`artists/${song?.artists[0].adamid}`}>
            <p className="text-sm font-bold text-gray-300 mt-1 truncate">
              {song?.subtitle}
            </p>
          </Link>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const topPlays = data?.slice(0, 15);

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

  return (
    <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col ">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center mb-5">
          <h2 className="text-white font-bold text-2">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
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
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.artists[0].adamid} `}>
                <img
                  src={song?.images.background}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="sm:w-full w-[[calc(100%-400px)]]  flex flex-col">
        <div className="flex flex-row justify-between items-center mt-5 mb-5">
          <h2 className="text-white font-bold text-2">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1 h-screen pb-80 overflow-x-hidden overflow-y-scroll hide-scrollbar">
          {topPlays?.map((song, i) => (
            <TopChartsCard
              key={i}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPlay;
