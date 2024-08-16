import { genres } from "../assets/constants";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectGenreListId } from "../redux/features/playerSlice";

const pageNames = {
  "/": "Discover", //
  "/top-charts": "Top Charts",
  "/top-artists": "Top Artists",
  "/around-you": "Around You",
};

const PageHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { genreListId } = useSelector((state) => state.player);
  const path = location.pathname;
  const pageName = pageNames[path];

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
  return (
    pageNames.hasOwnProperty(path) && (
      <div
        className="xl:w-[96%] mb-3  flex justify-between items-center
    lg:flex-row md:mb-10 mt-6"
      >
        <h2 className="font-bold md:text-3xl text-2xl ml-0   text-white text-left">
          {pageName} {genreTitle}
        </h2>
        {pageName === "Around You" ? null : (
          <select
            onChange={(e) => {
              dispatch(selectGenreListId(e.target.value));
            }}
            value={genreListId || "Pop"}
            className="bg-black  text-gray-300 p-2 text-sm rounded-lg outline-none"
            id="genres"
          >
            {genres.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.title}
              </option>
            ))}
          </select>
        )}
      </div>
    )
  );
};

export default PageHeader;
