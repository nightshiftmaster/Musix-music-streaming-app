import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
// import { useGetSongsByGenreQuery } from "../redux/services/shazamCore"; // production api
import { useGetSongsByGenreQuery } from "../redux/services/apiCore"; // tests api
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { React } from "react";
import _ from "lodash";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { genreListId } = useSelector((state) => state.player);
  const { data, isFetching, isError } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  if (isFetching) return <Loader title="Loading top charts" />;

  if (isError) return <Error />;

  return (
    <div className="flex flex-col">
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
        {data?.slice(0, 20).map((song, i) => (
          <SongCard
            key={song + i}
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
