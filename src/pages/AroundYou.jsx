import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

// axios
//   .get(
//     `https://geo.ipify.org/api/v2/country?apiKey=at_qcVltM1mkAAQIqQvSncbmkJq84sBN`
//   )
//   .then((res) => {
//     return setCountry(res?.data?.location?.country);
//   })
//   .catch((err) => console.log(err))
//   .finally(() => setLoading(false));

import React from "react";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  console.log(country);
  const { data, isFetching, isError } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    setCountry("IL");
  }, [country]);

  if (isFetching) {
    return <Loader title="Loading songs around you" />;
  }

  if (isError && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2
        className="font-bold md:text-3xl text-2xl mb-3 text-white text-left w-full flex justify-between items-center
    lg:flex-row flex-col mt-6 md:mb-10"
      >
        {`Around You ${country}`}
      </h2>

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
            {data?.map((song, i) => (
              <SwiperSlide
                key={i}
                className="shadow-lg rounded-full animate-slideright"
              >
                <SongCard
                  key={song.key}
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

      <div className="w-full justify-around items-center flex-wrap md:flex hidden gap-6 text-white">
        {data?.map((song, i) => (
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

export default AroundYou;
