import { useEffect, useState } from "react";
import { fetchData, getColor } from "../constants/Helper";
import { useParams } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import Card from "../component/Card";
import { breakpoints } from "./Trending";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import fallbackImg from "../assets/movix.png";
import { PlayCircleIcon } from "lucide-react";

export default function DynamicPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [cast, setCast] = useState(null);
  const [similar, setSimilar] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const movieResponse = await fetchData(`movie/${id}`);
        setData(movieResponse);

        const castResponse = await fetchData(`movie/${id}/credits`);
        setCast(castResponse.cast);

        const similarResponse = await fetchData(`movie/${id}/similar`);
        setSimilar(similarResponse);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, [id]);

  const renderMovieInfo = () => {
    return (
      <div className="">
        <h1 className="text-3xl mb-5 md:text-3xl lg:text-6xl font-semibold">
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

        <div className="flex my-5 gap-5 items-center">
          <div className="flex items-center gap-5 sm:gap-10 w-[15rem] ">
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
            <PlayCircleIcon
              className={`w-full h-full text-yellow-400 cursor-pointer`}
            />
          </div>
          <span className="text-2xl">Watch Trailer</span>
        </div>

        <div className="my-2">
          <h1 className="text-4xl font-bold">Overview</h1>
          {["status", "director", "writer", "creator"].map((field, index) => (
            <div key={index}>
              <hr className="my-2 border-slate-600" />
              <p className="text-white py-2">
                <span className="text-gray-400 capitalize">{field}:</span>{" "}
                {data?.[field]}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={` flex relative flex-col justify-center items-center mt-10 text-white bg-gradient-to-b from-[#04152e51] to-[#04152E]`}
    >
      {isLoading && (
        <p className="text-4xl text-white text-center mt-42">Loading...</p>
      )}
      <div className="bg-gradient-to-b from-[#04152e51] to-[#04152E] inset-0 h-screen absolute"></div>
      <div className="mx-auto w-[90%] md:w-[80%] relative z-10 mt-10">
        {data && (
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-1/3 rounded-xl overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
                alt={data?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-2/3">{renderMovieInfo()}</div>
          </div>
        )}
      </div>
      <img
        src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
        alt="Background"
        className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-screen object-cover"
      />
      <div className="mx-auto w-[90%] md:w-[80%] mt-20">
        <div className="mb-2 md:mb-0">
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
                <SwiperSlide key={item.id}>
                  <div
                    className="flex flex-col items-center"
                    style={{ minWidth: "140px" }}
                  >
                    <div className="h-40 w-40 rounded-full overflow-hidden">
                      <img
                        src={
                          item?.profile_path
                            ? `https://image.tmdb.org/t/p/original${item.profile_path}`
                            : fallbackImg
                        }
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
      </div>
      <div className="mx-auto w-[90%] md:w-[80%] mt-20">
        <div className="mb-2 mt-10 md:mb-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl">Similar Item</h1>
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
      </div>
    </div>
  );
}
