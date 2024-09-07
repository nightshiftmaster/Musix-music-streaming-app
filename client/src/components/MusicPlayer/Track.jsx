import React from "react";

const Track = ({ isPlaying, isActive, activeSong }) => {
  const songImage = activeSong?.attributes
    ? activeSong?.attributes?.artwork?.url
    : activeSong?.images?.coverart;
  const songTitle = activeSong?.attributes
    ? activeSong?.attributes?.name
    : activeSong?.title;
  const songSubTitle = activeSong?.attributes
    ? activeSong?.attributes?.artistName
    : activeSong?.subtitle;
  return (
    <div className="flex-1 flex items-center justify-start">
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
        } sm:block h-16 w-16 mr-4`}
      >
        <img src={songImage} alt="cover art" className="rounded-full" />
      </div>
      <div className="lg:w-[50%] w-36">
        <p className="truncate text-white font-bold text-lg">
          {activeSong ? songTitle : "No active Song"}
        </p>
        <p className="truncate text-gray-300">
          {activeSong ? songSubTitle : "No active Song"}
        </p>
      </div>
    </div>
  );
};

export default Track;
