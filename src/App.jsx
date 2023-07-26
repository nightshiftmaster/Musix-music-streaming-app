import { useSelector } from "react-redux";
import { Route, Routes, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { logo } from "./assets";

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from "./components";
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
} from "./pages";

const App = () => {
  const [link, setLink] = useState(false);

  const divRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      divRef?.current?.scrollIntoView({ top: 0, behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, [link]);

  const { activeSong } = useSelector((state) => state.player);
  return (
    <div className="flex relative">
      <Sidebar link={link} setLink={setLink} />
      <div
        ref={divRef}
        className="flex-1 flex flex-col h-full bg-gradient-to-br from-black to-[#121286]"
      >
        <div className="lg:hidden flex flex-row w-[110px] justify-start items-center ml-[7px]">
          <Link to={`/`}>
            <img
              onClick={() => setLink(!link)}
              src={logo}
              alt="logo"
              className="w-20 h-16 object-contain ml-3"
            />
          </Link>
        </div>

        <Searchbar link={link} setLink={setLink} />
        <div className="px-6 md:h-[calc(100vh-72px)] overflow-x-hidden overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col">
          <div className="flex-1 h-fit pb-9 lg:w-auto w-[calc(100vw-50px)]">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route
                path="/artists/:id"
                element={<ArtistDetails link={link} setLink={setLink} />}
              />
              <Route
                path="/songs/:songid"
                element={<SongDetails link={link} setLink={setLink} />}
              />
              <Route
                path="/search/:searchTerm"
                element={<Search link={link} setLink={setLink} />}
              />
            </Routes>
          </div>

          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay link={link} setLink={setLink} />
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="fixed h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
