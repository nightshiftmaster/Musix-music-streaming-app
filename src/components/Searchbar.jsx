import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";

const Searchbar = ({ link, setLink }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isOpen, setOpen] = useState(false);

  const currRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
    setResult("");
    setInput("");
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        ref.current === event.target ? setOpen(true) : setOpen(false);
      }
      document.addEventListener("click", handleClickOutside);
    }, [ref]);
  }

  useOutsideAlerter(currRef);

  useEffect(() => {
    if (input.length < 2) {
      return;
    }
    const fetchData = async () => {
      const responce = await fetch(
        `https://shazam-core.p.rapidapi.com/v1/search/suggest?query=${input}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "e8fe3c0f64msh4cb10de9c1b4535p107ba1jsnc51d5da5b361",
          },
        }
      );
      const data = await responce.json();
      setResult(data);
      setOpen(true);
    };
    fetchData();
  }, [input]);

  const AutocompleteCard = () => {
    if (input.length < 2) {
      setOpen(false);
      return;
    }
    return (
      <div
        onClick={() => {
          setResult("");
          setInput("");
        }}
      >
        <ul
          className={`absolute z-0 max-w-sm rounded overflow-hidden shadow-lg backdrop-blur-xl cursor-pointer ${
            isOpen ? "visible" : "hidden"
          }`}
          data-testid="auto-complete"
        >
          {result?.hints?.map((item, i) => (
            <li
              key={i}
              onClick={() => {
                navigate(`/search/${item.term}`);
                setResult("");
                setInput("");
              }}
              className="block text-base text-white p-4 hover:bg-sky-600 rounded-lg"
              id="auto-complete-element"
              // data-testid="auto-complete-element"
            >
              {item.term}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div
        className="w-screen sticky xl:w-[calc(100vw-800px)] lg:w-[calc(100vw-250px)] bg-gradient-to-r from-black to-[#1d1d5b] lg:mt-2 mb-2  top-0 rounded-xl h-[50px] flex flex-row justify-start items-center z-40"
        data-testid="search-bar"
      >
        <div className="w-screen xl:w-[calc(100vw-800px)] h-12 shine-effect bg-transparent absolute"></div>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className=" text-gray-200 focus-within:text-gray-400 "
        >
          <label htmlFor="search-field" className="sr-only">
            Search all songs
          </label>
          <div className="flex flex-row justify-start items-center ">
            <FiSearch className="w-6 h-7 ml-4" />
            <input
              ref={currRef}
              id="search-field"
              placeholder="Search music"
              value={input}
              onChange={async (e) => {
                setInput(e.target.value);
              }}
              className="flex-1 w-[calc(100vw-90px)] bg-transparent animate-pulse bg-green single-element border-none outline-none placeholder-gray-300  lg:placeholder-gray-300 text-md text-gray-300 p-3"
            />
            <HiOutlineHome
              onClick={() => setLink(!link)}
              className="absolute right-4 w-5 h-7 lg:invisible"
            />
          </div>
          {null || <AutocompleteCard />}
        </form>
      </div>
    </>
  );
};

export default Searchbar;
