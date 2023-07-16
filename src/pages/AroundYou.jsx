import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { Link } from "react-router-dom";
import { logo } from "../assets";

import React from "react";

const AroundYou = ({ link }) => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, isError } = useGetSongsByCountryQuery(country);

  const divRef = useRef(null);

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [link]);

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_qcVltM1mkAAQIqQvSncbmkJq84sBN`
      )
      .then((res) => {
        return setCountry(res?.data?.location?.country);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading) {
    return <Loader title="Loading songs around you" />;
  }

  if (isError && country) return <Error />;

  return (
    <div className="flex flex-col">
      <div ref={divRef}></div>
      <div className="lg:hidden flex flex-col w-screen justify-center items-center ">
        <Link to={`/`}>
          <img
            src={logo}
            alt="logo"
            className="ml-[111px] w-28 h-32 object-contain mr-[200px]"
          />
        </Link>
      </div>
      <h2
        className="font-bold text-3xl text-white text-left w-full flex justify-between items-center
    lg:flex-row flex-col mt-4 mb-8"
      >
        {`Around You ${country}`}
      </h2>

      <div className="flex-col w-full md:hidden flex">
        <div className="w-full justify-between items-center flex-col mt-4">
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
