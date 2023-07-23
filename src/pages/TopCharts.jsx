import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { React, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import _ from "lodash";

const TopCharts = ({ setLink, link }) => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, isError } = useGetTopChartsQuery();

  const divRef = useRef(null);

  // useEffect(() => {
  //   divRef?.current?.scrollIntoView({ behavior: "smooth" });
  // }, [data]);

  if (isFetching) return <Loader title="Loading top charts" />;

  if (isError) return <Error />;

  return (
    <div className="flex flex-col">
      <div ref={divRef}></div>
      <div className="lg:hidden flex flex-col w-screen justify-center items-center "></div>
      <h2
        className="font-bold md:text-3xl text-2xl  text-white text-left w-full flex justify-between items-center
    lg:flex-row flex-col mt-5 mb-1"
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
              //   console.log(song.key);
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

      <div className="w-full justify-around items-center flex-wrap md:flex hidden gap-6 text-white">
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
