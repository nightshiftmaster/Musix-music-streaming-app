import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
// import { useGetSongsByCountryQuery } from "../redux/services/shazamCore"; // production api
import { useGetSongsByCountryQuery } from "../redux/services/apiCore"; // test api
import { Swiper, SwiperSlide } from "swiper/react";
import { setCountryCode } from "../redux/features/apiSlice";
import { FreeMode } from "swiper";

import React from "react";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, isError } = useGetSongsByCountryQuery("IL");

  useEffect(() => {
    dispatch(setCountryCode("IL"));
  }, []);

  // if (isFetching) {
  //   return <Loader title="Loading songs around you" />;
  // }

  // if (isError && country) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="flex-col w-full md:hidden flex">
        <div className="w-full justify-between items-center flex-col mt-2">
          <Swiper
            slidesPerView={2}
            spaceBetween={50}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4"
          >
            {data?.slice(0, 50).map((song, i) => (
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
            ))}
          </Swiper>
        </div>
      </div>

      <div
        className="w-full justify-around items-center flex-wrap md:flex hidden gap-6 text-white"
        data-testid="around-you-songs"
      >
        {data?.slice(0, 50).map((song, i) => (
          <SongCard
            key={i}
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

export default AroundYou;
