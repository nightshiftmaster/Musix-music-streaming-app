import { Error, Loader, ArtistCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import _ from "lodash";

import React from "react";

const TopArtists = ({ link }) => {
  const { data, isFetching, isError } = useGetTopChartsQuery();

  const divRef = useRef(null);

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  if (isFetching) {
    return <Loader title="Loading top charts" />;
  }

  if (isError) return <Error />;

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
    lg:flex-row flex-col mt-4 mb-8 "
      >
        Discover Top Artists
      </h2>

      <div className="flex flex-wrap justify-around gap-8">
        {_.uniqBy(data, "key")?.map((track, i) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
