import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import { getColor } from "../constants/Helper";
const imageBaseURL = "https://image.tmdb.org/t/p/w500";
function formatDate(releaseDate) {
  if (!releaseDate) return "Unknown Date";
  const date = new Date(releaseDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }).slice(0, 3);
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export default function Card({ movie }) {
  console.log(movie);
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-full  my-3 text-white rounded-t-xl cursor-pointer"
      onClick={() => navigate(`/Details/${movie.id}`)}
    >
      {movie.poster_path && (
        <div className="relative rounded-md overflow-hidden">
          <img
            src={`${imageBaseURL}${movie.poster_path}`}
            className="object-cover w-full h-full rounded-t-xl duration-200 ease-in"
            alt={`${movie.title || movie.name} Poster`}
          />
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-200 hover:opacity-40"></div>
          <div className="absolute bottom-3 right-2 flex justify-center items-center">
            <span className=" bg-pink-600 px-3  rounded-sm font-semibold text-xs">
              {movie.original_language || ""}
            </span>
          </div>
        </div>
      )}
      <div className="-translate-y-10 px-3">
        <div
          className="bg-white rounded-full p-1"
          style={{ width: 60, height: 60 }}
        >
          <CircularProgressbar
            styles={{
              text: {
                // Text color
                fill: "#000",
                // Text size
                fontSize: "1.5rem",
              },
              path: {
                stroke: getColor(movie.vote_average),
                strokeLinecap: "butt",
              },
            }}
            value={movie.vote_average * 10}
            text={`${movie.vote_average.toFixed(1)}%`}
          />
        </div>
        <div className="flex flex-col pl-2 ">
          <h1 className="text-lg font-semibold my-2">
            {(movie.title?.length > 18
              ? `${movie.title.slice(0, 20)}...`
              : movie.title) ||
              (movie.name?.length > 18
                ? `${movie.name.slice(0, 20)}...`
                : movie.name)}
          </h1>
          <span className="text-gray-500 mb-2">
            {formatDate(movie.release_date || movie.first_air_date)}
          </span>
        </div>
      </div>
    </div>
  );
}
