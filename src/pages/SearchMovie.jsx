import React, { useEffect, useState } from "react";
import { fetchData } from "../constants/Helper";
import Card from "../component/Card";
import { useParams } from "react-router-dom";
export default function SearchMovie() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const scroller = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  };

 

  useEffect(() => {
    if (selectedGenre) {
      const fetchMovies = async () => {
        setLoading(true);
        try {
          const response = await fetchData(
            `discover/movie?with_genres=${selectedGenre}&sort_by=${sort}&page=${page}`
          );
          console.log(response);
          setMovies((prevMovies) => [...prevMovies, ...response.results]);
        } catch (err) {
          console.error("Error fetching movies:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }
  },  [page]);

  
 

  useEffect(() => {
    window.addEventListener("scroll", scroller);
    return () => {
      window.removeEventListener("scroll", scroller);
    };
  }, [loading]);

  return (
    <div className="w-[95%] md:w-[80%] my-20 mx-auto">
      <div className=" flex mb-10  flex-col  sm:flex-row justify-between text-white pt-10">
        <div className="mb-2  md:mb-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl">Explore Movie</h1>
        </div>
       
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies &&
          movies.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              imageBaseURL="https://image.tmdb.org/t/p/w500"
            />
          ))}
      </div>
      {loading && <div className="text-center text-white">Loading...</div>}
    </div>
  );
}
