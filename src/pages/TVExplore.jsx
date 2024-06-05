import React, { useEffect, useState } from "react";
import { fetchData } from "../constants/Helper";
import Card from "../component/Card";

export default function TVExplore() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("genre/tv/list?language=en-US");

  const scroller = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  };

  // discover/movie?sort_by=popularity.desc
  // discover/movie?sort_by=popularity.asc
  // discover/movie?sort_by=vote_average.desc
  // discover/movie?sort_by=vote_average.asc
  // discover/movie?sort_by=primary_release_date.desc
  // discover/movie?sort_by=primary_release_date.asc
  // discover/movie?sort_by=original_title.asc

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetchData(sort);
        setGenres(response.genres);
        const randomGenre =
          response.genres[Math.floor(Math.random() * response.genres.length)];
        setSelectedGenre(randomGenre.id);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      const fetchMovies = async () => {
        setLoading(true);
        try {
          const response = await fetchData(
            `discover/tv?with_genres=${selectedGenre}&sort_by=${sort}&page=${page}`
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
  }, [selectedGenre, page, sort]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setMovies([]);
    setPage(1);
  };
  const handleSortChange = (event) => {
    setSort(event.target.value);
    setMovies([]);
    setPage(1);
  };

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
        <div className="flex gap-3 p-[2px] max-w-fit text-black text-xs rounded-full font-semibold">
          <select
            name="forGenres"
            id="forGenres"
            className="px-3 py-2 rounded-full bg-slate-600 text-white text-xs font-semibold"
            onChange={handleGenreChange}
            value={selectedGenre}
          >
            <option value="">Select genres</option>
            {genres &&
              genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
          </select>

          <select
            onChange={handleSortChange}
            className="px-3 py-2 rounded-full bg-slate-600 text-white text-xs font-semibold"
            name=""
            id=""
          >
            <option value="">Sort by</option>
            <option value="popularity.desc">Popularity Desc</option>
            <option value="popularity.asc">Popularity Asc</option>
            <option value="vote_average.desc">Rating Desc </option>
            <option value="vote_average.asc">Rating Asc</option>
            <option value="primary_release_date.desc">Release Date Desc</option>
            <option value="primary_release_date.asc">Release Date Asc</option>
            <option value="original_title.asc">Title A-z</option>
          </select>
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
