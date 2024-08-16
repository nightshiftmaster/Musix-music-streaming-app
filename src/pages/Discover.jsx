import { Loader, SongCard } from "../components";
import { useSelector } from "react-redux";
// import { useGetSongsByGenreQuery } from "../redux/services/shazamCore"; // production api
import { useGetSongsByGenreQuery } from "../redux/services/apiCore"; // tests api
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

const Discover = () => {
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  if (isFetching) {
    return <Loader title="Loading songs" />;
  }
  if (error) {
    console.log("something went wrong");
  }

  return (
    <div className="flex flex-col" data-testid="discover">
      <div
        className="w-full justify-around items-center flex-wrap md:flex hidden gap-6 text-white"
        data-testid="songs-bar"
      >
        {data?.slice(0, 20).map((song, i) => {
          return (
            <SongCard
              key={song?.attributes?.name + i}
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
        <div className="w-full justify-between items-center flex-col">
          <Swiper
            slidesPerView={2}
            spaceBetween={40}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4"
            breakpoints={{
              600: { slidesPerView: 3 },
            }}
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
