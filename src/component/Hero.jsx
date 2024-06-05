import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../constants/Helper";
import Card from "./Card";

export default function Hero() {
  const searchVal = useRef();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [background, setBackgroundData] = useState();

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await fetchData("movie/upcoming");
        setData(response);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBackgroundImage();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!data.results) return;
      const bg =
        data.results[Math.floor(Math.random() * data.results.length)]
          ?.backdrop_path;
      if (bg) {
        setBackgroundData(bg);
      }
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [data]);

  const handleFormSubmit = () => {
    if (!searchVal.current || !searchVal.current.value) {
      return;
    }
    navigate(`search/${searchVal.current.value}`, { replace: true });
  };

  return (
    <div
      className={`relative h-screen flex flex-col justify-center text-white px-4 sm:px-6 md:px-12 lg:px-24 ${
        !background
          ? "bg-[#04152E]"
          : "bg-gradient-to-b from-[#04152e51] to-[#04152E]"
      }`}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold mb-3 text-center">
        Welcome.
      </h1>
      <h4 className="text-sm sm:text-base md:text-xl lg:text-2xl font-medium mb-8 text-center">
        Millions of movies, TV shows and people to discover. Explore now.
      </h4>

      <form className="flex justify-center text-sm sm:text-base md:text-xl">
        <input
          ref={searchVal}
          type="text"
          name="searchQuery"
          placeholder="Search for a movie or TV show..."
          className="w-full md:max-w-[55%] p-3 sm:p-4 px-4 sm:px-6 text-black rounded-l-full focus:outline-none"
        />
        <button
          className="bg-custom-gradient text-white px-4 sm:px-8 py-2 rounded-r-full"
          onClick={handleFormSubmit}
        >
          Search
        </button>
      </form>

      {background && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original${background}`}
            alt="Background"
            className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
