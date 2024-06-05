import { useEffect, useState } from "react";
import { fetchData, getColor } from "../constants/Helper";
import { useParams } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import Card from "../component/Card";
import { breakpoints } from "./Trending";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components

export default function DynamicPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [cast, setCast] = useState(null);
  const [similar, setSimilar] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchData(`movie/${id}`);
        setData(response);
        console.log(response);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCast = async () => {
      try {
        const response = await fetchData(`movie/${id}/credits`);
        setCast(response.cast);
        console.log(response.cast);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSimilar = async () => {
      try {
        const response = await fetchData(`movie/${id}/similar`);
        setSimilar(response);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovie();
    fetchCast();
    fetchSimilar();
  }, [id]);

  const renderMovieInfo = () => {
    return (
      <div className="">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold">
          {data?.original_title}
        </h1>
        <div className="flex gap-1 py-2">
          {data &&
            data?.genres.map((item, index) => {
              return (
                <span
                  key={index}
                  className="text-white text-sm px-1 rounded-sm bg-pink-600 mb-2"
                >
                  {item.name}
                </span>
              );
            })}
        </div>
        <div className="flex gap-5" style={{ width: 120, height: 120 }}>
          <CircularProgressbar
            styles={{
              strokeLinecap: "round",
              text: {
                fill: "#fff",
                fontSize: "1.5rem",
              },
              path: {
                stroke: getColor(data?.vote_average),
                strokeLinecap: "butt",
              },
              background: {
                fill: "#3e98c7",
              },
            }}
            value={data?.vote_average * 10}
            text={`${data?.vote_average.toFixed(1)}%`}
          />
        </div>
        <div className="my-2">
          <h1 className="text-4xl font-bold">Overview</h1>
          <hr className="my-2 border-slate-600" />
          <p className="text-white py-2">
            <span className="text-gray-400">Status:</span> {data?.status}
          </p>
          <hr className="my-2 border-slate-600" />
          <p className="text-white py-2">
            <span className="text-gray-400">Director:</span> {data?.director}
          </p>
          <hr className="my-2 border-slate-600" />
          <p className="text-white py-2">
            <span className="text-gray-400">Writer:</span> {data?.writer}
          </p>
          <hr className="my-2 border-slate-600" />
          <p className="text-white py-2">
            <span className="text-gray-400">Creator:</span> {data?.creator}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="relative ">
      <div
        className={` pt-20   flex flex-col justify-center text-white px-4 sm:px-6 md:px-12 lg:px-24 ${
          !data
            ? "bg-[#04152E]"
            : "bg-gradient-to-b from-[#04152e51] to-[#04152E]"
        }`}
      >
        {isLoading && <p>Loading...</p>}

        <div className="w-[95%] md:w-[90%] mx-auto">
          {data && (
            <>
              <div className="flex gap-10 flex-col md:flex-row">
                <div className="w-full  rounded-xl overflow-hidden md:w-1/3">
                  <img
                    src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
                    alt={data?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3">{renderMovieInfo()}</div>
              </div>

              <div className="mb-2 mt-10   md:mb-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl">Top Cast</h1>
              </div>

              <div className="flex overflow-x-auto gap-10 py-4 cursor-pointer">
                {cast && (
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    breakpoints={breakpoints}
                  >
                    {cast.map((item) => (
                      <SwiperSlide key={crypto.randomUUID()}>
                        <div
                          className="flex flex-col items-center"
                          style={{ minWidth: "140px" }}
                        >
                          <div className="h-40 w-40 rounded-full overflow-hidden">
                            <img
                              src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                              alt={item.name}
                              className="h-full w-full hover:scale-110 transition-all ease-in-out duration-300 rounded-full object-cover"
                            />
                          </div>
                          <span className="text-white mt-2 text-center">
                            {item.name}
                          </span>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>

              <div className="mb-2 mt-10   md:mb-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl">
                  Similar Item
                </h1>
              </div>

              <div className="flex flex-wrap justify-center mt-8">
                {similar && (
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    breakpoints={breakpoints}
                  >
                    {similar.results &&
                      similar.results.map((item) => (
                        <SwiperSlide key={item.id}>
                          <Card movie={item} />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
        alt="Background"
        className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
      />
    </div>
  );
}
