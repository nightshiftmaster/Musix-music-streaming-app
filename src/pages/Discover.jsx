import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { useEffect, useRef, useState } from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";

const Discover = ({ link, setLink }) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  const divRef = useRef(null);

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  if (isFetching) {
    return <Loader title="Loading songs" />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <div ref={divRef}></div>
      <div className="lg:hidden flex flex-col w-screen justify-center items-center ">
        <Link to={`/`}>
          <img
            onClick={() => setLink(!link)}
            src={logo}
            alt="logo"
            className="ml-[111px] w-28 h-32 object-contain mr-[200px]"
          />
        </Link>
      </div>
      <div
        className="w-[calc(100%-10px)] flex justify-between items-center
        lg:flex-row flex-col mt-4 mb-8"
      >
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => {
            dispatch(selectGenreListId(e.target.value));
            setLink(!link);
          }}
          value={genreListId || "Pop"}
          className="bg-black text-gray-300 p-2 text-sm rounded-lg outline-none lg:mt-0 mt-8"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full justify-around items-center flex-wrap md:flex hidden gap-6 text-white">
        {data?.map((song, i) => {
          return (
            <SongCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
            />
          );
        })}
      </div>
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
    </div>
  );
};

export default Discover;
