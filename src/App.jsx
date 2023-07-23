import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

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
    setTimeout(() => {
      divRef?.current?.scrollIntoView({ top: 0, behavior: "smooth" });
    }, 1100);
    return;
  }, [link]);

  const { activeSong } = useSelector((state) => state.player);
  return (
    <div className="flex relative h-screen">
      <Sidebar link={link} setLink={setLink} />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <div ref={divRef}>
          <Searchbar />
        </div>
        <div className="px-6 h-[calc(100vh-72px)] overflow-x-hidden overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col">
          <div className="flex-1 h-fit pb-10 lg:w-auto w-[calc(100vw-50px)]">
            <Routes>
              <Route
                path="/"
                element={<Discover link={link} setLink={setLink} />}
              />
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
            <TopPlay link={link} />
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
