import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
const imageBaseURL = "https://image.tmdb.org/t/p/w500";
function formatDate(releaseDate) {
  if (!releaseDate) return "Unknown Date";
  const date = new Date(releaseDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }).slice(0, 3);
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
const getColor = (rating) => {
  if (rating >= 7) return "rgba(62, 152, 199, 1)"; // blue
  if (rating >= 4) return "rgba(255, 193, 7, 1)"; // yellow
  return "rgba(220, 53, 69, 1)"; // red
};
export default function Card({ movie }) {
  const navigate = useNavigate();

  return (
    <div
      className=" w-50 mx-3 my-3 text-white  rounded-t-xl  cursor-pointer"
      onClick={() => navigate(`/Details/${movie.id}`)}
    >
      {movie.poster_path && (
        <div className="relative rounded-md overflow-hidden">
          <img
            src={`${imageBaseURL}${movie.poster_path}`}
            className="object-cover w-full h-72 rounded-t-xl duration-200 ease-in"
            alt={`${movie.title || movie.name} Poster`}
          />
          {/* <div className="absolute inset-0 bg-black/35"></div> */}
        </div>
      )}
      <div className="-translate-y-10 px-3 ">
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
            text={`${movie.vote_average.toFixed(1)}%
            
            `}
          />
        </div>
        <div className="flex flex-col pl-2 ">
          <h1 className="text-xl font-semibold mt-2 mb-2">
            {(movie.title?.length > 18
              ? `${movie.title.slice(0, 20)}...`
              : movie.title) ||
              (movie.name?.length > 18
                ? `${movie.name.slice(0, 20)}...`
                : movie.name)}
          </h1>
          <span className="text-blue-300 mb-2">
            {formatDate(movie.release_date || movie.first_air_date)}
          </span>
        </div>
      </div>
    </div>
  );
}
