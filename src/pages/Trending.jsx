import React, { useEffect, useState } from "react";
import fetchData from "../constants/Helper";
import Card from "../component/Card";
import { Carousel } from "antd";

export default function Trending() {
  const [data, setData] = useState({});
  const [timeWindow, setTimeWindow] = useState("day"); // Default time window is "week"

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetchData(
          `trending/all/${timeWindow}?language=en-US'`
        ); // Fetch data based on selected time window
        setData(response);
        console.log(response);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
      }
    };

    fetchTrending();
  }, [timeWindow]); // Fetch data whenever time window changes

  const handleTimeWindowChange = (newTimeWindow) => {
    setTimeWindow(newTimeWindow);
  };
  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <>
      <div className="w-full flex justify-between md:max-w-6xl mx-auto  text-white pt-10">
        <h1 className="text-3xl">Trending</h1>
        <div className="flex gap-3 bg-white text-black rounded-full  font-semibold">
          <button
            className={`px-10 py-2 rounded-full  focus:text-white focus:outline-none ${
              timeWindow === "day" ? "bg-custom-gradient" : ""
            }`}
            onClick={() => handleTimeWindowChange("day")}
          >
            Day
          </button>
          <button
            className={`px-10 py-2 rounded-full focus:text-white focus:outline-none ${
              timeWindow === "week" ? "bg-custom-gradient" : ""
            }`}
            onClick={() => handleTimeWindowChange("week")}
          >
            Week
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-8">
        {data && data.results && (
          <Carousel>
            {/* {data?.results?.map((item) => {
              console.log(data.results);
               return <Card style={contentStyle} key={item.id} movie={item} />;
            })} */}
             <Card key={1} movie={data.results[0]} />

          </Carousel>
        )}
        {/* {data?.results?.map((item) => (
              <Card key={item.id} movie={item} />
            ))} */}
      </div>
    </>
  );
}
