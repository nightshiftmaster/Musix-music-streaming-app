import { React, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

const HistoryNavs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const [history, setHistory] = useState(["/"]);

  useEffect(() => {
    setHistory((prev) => {
      if (prev.includes(pathname)) {
        return prev;
      }
      const currHistory = [...prev, pathname];

      return currHistory;
    });
  }, [pathname]);

  const stopGoBack = pathname === "/" && history[0] === "/";
  const stopGoForward = history[history.length - 1] === pathname;

  return (
    <div className="gap-2 lg:flex hidden  justify-center items-center">
      <div
        className={`h-7 w-7 relative group ${
          stopGoBack ? "cursor-not-allowed" : "cursor-pointer"
        }
       rounded-full bg-slate-800`}
      >
        <div
          className={`w-fit transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
            stopGoBack ? "hidden" : "flex"
          }  absolute bottom-10 rounded-lg h-6 p-3 whitespace-nowrap text-white justify-center shadow-2xl text-xs items-center bg-slate-700`}
        >
          Go back
        </div>
        <IoIosArrowBack
          className="flex justify-center items-center mt-[2px]"
          onClick={() => {
            if (stopGoBack) {
              return;
            }
            navigate(-1);
          }}
          color={stopGoBack ? "gray" : "white"}
          size="25"
        />
      </div>
      <div
        className={`h-7 w-7 relative group ${
          stopGoForward ? "cursor-not-allowed" : "cursor-pointer"
        }
       rounded-full bg-slate-800`}
      >
        <div
          className={`w-fit transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
            stopGoForward ? "hidden" : "flex"
          }  absolute bottom-10 rounded-lg h-6 p-3 whitespace-nowrap text-white justify-center shadow-2xl text-xs items-center bg-slate-700`}
        >
          Go forward
        </div>
        <IoIosArrowForward
          className="flex justify-center items-center mt-[2px]"
          onClick={() => {
            navigate(+1);
          }}
          color={stopGoForward ? "gray" : "white"}
          size="25"
        />
      </div>
    </div>
  );
};

export default HistoryNavs;
