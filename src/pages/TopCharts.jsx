import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore"; // production api
// import { useGetTopChartsQuery } from "../redux/services/fakeApiCore"; // tests api
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { React } from "react";
import _ from "lodash";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, isError } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading top charts" />;

  if (isError) return <Error />;

  return (
    <div className="flex flex-col">
      <h2
        className="font-bold md:text-3xl text-2xl mb-3 text-white text-left w-full flex justify-between items-center
    lg:flex-row flex-col mt-6 md:mb-10"
        data-testid="top-charts"
      >
        Discover Top Charts
      </h2>

      <div className="flex-col w-full md:hidden flex">
        <div className="w-full justify-between items-center flex-col mt-1">
          <Swiper
            slidesPerView={2}
            spaceBetween={50}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4"
          >
            {data?.map((song, i) => {
              return (
                <SwiperSlide
                  key={i}
                  className="shadow-lg rounded-full animate-slideright"
                >
                  <SongCard
                    key={i}
                    song={song}
                    i={i}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    discover="true"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <div
        className="w-full justify-around items-center flex-wrap md:flex hidden gap-6 text-white"
        data-testid="top-songs-container"
      >
        {_.uniqBy(data, "key")?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
