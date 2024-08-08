import { Error, Loader, SongCard } from "../components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useGetSongsByGenreQuery } from "../redux/services/shazamCore"; // production api
import { useGetSongsByGenreQuery } from "../redux/services/fakeApiCore"; // tests api
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { data as database } from "../assets/dataForFakeApi";
import { RiContactsBookLine } from "react-icons/ri";

const Discover = () => {
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );
  const [songs, setSongs] = useState([]);

  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  // console.log(artistObj);

  // songs
  // const ids = data.slice(0, 50).map((el) => el.id);
  const fetchedSongs = [];
  // artists;

  const artistData = [];
  // const ids = data
  //   .map((song) => song?.relationships?.artists?.data[0].id)
  //   .slice(38, 50);

  const artists = artistData.map((artist) => {
    const obj = Object.entries(artist);
    const [key, value] = obj[0];

    const newValue = {
      data: [
        {
          id: value?.data[0]?.id,
          avatar: value?.data[0].avatar,
          attributes: {
            artistBio: value.data[0]?.attributes?.artistBio,
            genreNames: value.data[0]?.attributes?.genreNames,
            name: value.data[0]?.attributes?.name,
          },
          views: {
            "top-songs": value.data[0].views["top-songs"].data
              .slice(0, 5)
              .map((song) => {
                return {
                  id: song.id,
                  attributes: {
                    name: song.attributes.name,
                    artistName: song.attributes.artistName,
                    artwork: { url: song.attributes.artwork.url },
                    previews: song.attributes.previews,
                  },
                };
              }),
          },
        },
      ],
    };
    return { [key]: newValue };
  });

  // console.log(artists);

  // simplitize songs data
  // const keys = fetchedSongs.map((song) => {
  //   const obj = Object.entries(song);
  //   const [key, value] = obj[0];

  //   const lyrics = value.resources.lyrics
  //     ? Object.values(value.resources.lyrics)[0].attributes?.text?.slice(0, 15)
  //     : "";
  //   const newValue = {
  //     data: value.data,
  //     resources: {
  //       artists: value.resources.artists,
  //       lyrics:
  //         value.resources.lyrics &&
  //         Object.values(value.resources.lyrics)[0].attributes?.text?.slice(
  //           0,
  //           15
  //         ),
  //     },
  //   };
  //   return { [key]: newValue };
  // });

  // console.log(keys);

  // console.log(database);

  // const topSongs = database.artists.map((artist) => {
  //   const artistsSongs = artist?.data[0].views["top-songs"].data;
  //   return artistsSongs.map((song) => ({
  //     ...song,
  //     relationships: {
  //       artists: {
  //         data: [
  //           {
  //             id: artist.data[0].id,
  //             type: "artists",
  //           },
  //         ],
  //       },
  //     },
  //   }));
  // });

  // console.log(topSongs.flat());

  // console.log(datIds);
  // 128818198;

  // console.log(topSongs.flat().flat());
  // const keys = Object.keys(database.charts);

  // const convertData = (data) => {
  //   const obj = {};
  //   const keys = Object.keys(data);
  //   const charts = keys.map((key) => {
  //     const coll = data[key].map((song) => {
  //       return {
  //         id: song.id,
  //         attributes: {
  //           name: song.attributes.name,
  //           artistName: song.attributes.artistName,
  //           artwork: { url: song.attributes.artwork.url },
  //           previews: song.attributes.previews,
  //         },
  //         relationships: { artists: song?.relationships?.artists },
  //       };
  //     });
  //     return (obj[key] = coll);
  //   });
  //   return obj;
  // };

  const son = fetchedSongs.reduce((acc, song, i) => {
    return [
      ...acc,
      {
        id: song.id,
        attributes: {
          name: song.attributes.name,
          artistName: song.attributes.artistName,
          artwork: { url: song.attributes.artwork.url },
          previews: song.attributes.previews,
        },
        relationships: { artists: song.relationships.artists },
      },
    ];
  }, []);

  // console.log(son);

  // console.log(convertData(fetchedSongs));

  const fetchData = async (id) => {
    try {
      const res = await fetch(
        `https://shazam-core.p.rapidapi.com/v2/artists/details?artist_id=${id}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "shazam-core.p.rapidapi.com",
            "x-rapidapi-key":
              "e8fe3c0f64msh4cb10de9c1b4535p107ba1jsnc51d5da5b361",
          },
        }
      );
      if (res);
      return res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // useEffect(() => {
  //   const fetchWithDelay = async () => {
  //     const uniqueIds = new Set(ids); // Убедимся, что ID уникальны
  //     for (const id of uniqueIds) {
  //       const result = await fetchData(id);
  //       if (result) {
  //         setSongs((curr) => {
  //           if (!curr.some((song) => Object.keys(song)[0] === id)) {
  //             return [...curr, { [id]: result }];
  //           }
  //           return curr;
  //         });
  //       }
  //       await delay(11000); // Задержка 3 секунды между вызовами
  //     }
  //   };

  //   fetchWithDelay();
  // }, [ids]);

  // console.log(songs);

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
