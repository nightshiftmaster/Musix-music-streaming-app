import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logo } from "../assets";
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
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
    return (
      <div
        onClick={() => {
          setResult("");
          setInput("");
        }}
      >
        <ul
          className={`absolute z-10 max-w-sm rounded overflow-hidden shadow-lg backdrop-blur-md bg-white/1 cursor-pointer ${
            isOpen ? "visible" : "invisible"
          }`}
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
            >
              {item.term}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-row justify-start items-center">
      <Link to={`/`}>
        <img
          onClick={() => setLink(!link)}
          src={logo}
          alt="logo"
          className="lg:hidden w-24 h-16 object-contain ml-4"
        />
      </Link>

      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className=" text-gray-400 focus-within:text-gray-600"
      >
        <label htmlFor="search-field" className="sr-only">
          Search all songs
        </label>
        <div className="flex flex-row justify-start items-center">
          <FiSearch className="w-4 ml-3" />
          <input
            ref={currRef}
            type="search"
            name="search-field"
            autoComplete="off"
            id="search-field"
            placeholder="Search"
            value={input}
            onChange={async (e) => {
              setInput(e.target.value);
            }}
            className="flex-1  bg-transparent border-none outline-none placeholder-gray-500 text-md text-white p-2"
          />
        </div>
        {null || <AutocompleteCard />}
      </form>
    </div>
  );
};

export default Searchbar;
