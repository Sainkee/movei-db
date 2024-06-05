import React, { useEffect, useState } from "react";
import fetchData from "../constants/Helper";
import Card from "../component/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Switch from "../component/Switch";

export  const breakpoints = {
  320: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  640: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  768: {
    slidesPerView: 4,
    spaceBetween: 30,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 30,
  },
  1280: {
    slidesPerView: 5,
    spaceBetween: 30,
  },
};

export default function Trending() {
  const [data, setData] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [ratedData, setRatedData] = useState({});
  const [timeWindow, setTimeWindow] = useState("day");
  const [categories, setCategories] = useState("movie");
  const [ratedCategory, setRatedCategory] = useState("movie");

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetchData(
          `trending/all/${timeWindow}?language=en-US`
        );
        setData(response);
        console.log(response);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
      }
    };

    fetchTrending();
  }, [timeWindow]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchData(
          `discover/${categories}?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
        );
        setCategoryData(response);
        console.log(response);
      } catch (err) {
        console.error("Error fetching popular movies:", err);
      }
    };

    fetchCategories();
  }, [categories]);

  useEffect(() => {
    const fetchMostRated = async () => {
      try {
        const response = await fetchData(
          `discover/${ratedCategory}?include_adult=true&include_video=false&language=en-US&page=1&sort_by=vote_average.desc`
        );
        setRatedData(response);
        console.log(response);
      } catch (err) {
        console.error("Error fetching most rated movies:", err);
      }
    };

    fetchMostRated();
  }, [ratedCategory]);

  const handleTimeWindowChange = (newTimeWindow) => {
    setTimeWindow(newTimeWindow);
  };

  const handleCategoryChange = (newCategory) => {
    setCategories(newCategory);
  };

  const handleRatedCategoryChange = (newRatedCategory) => {
    setRatedCategory(newRatedCategory);
  };



  return (
    <div className="w-[90%] md:max-w-7xl mx-auto">
      {/* Trending Section */}
      <Switch
        onclick={handleTimeWindowChange}
        topic={"Trending"}
        btn1={"day"}
        btn2={"week"}
        activeBtn={timeWindow}
      />
      <div className="flex flex-wrap justify-center mt-8">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={breakpoints}
        >
          {data &&
            data.results &&
            data.results.map((item) => (
              <SwiperSlide key={item.id}>
                <Card movie={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* What's Popular Section */}
      <Switch
        onclick={handleCategoryChange}
        topic={"Whats Popular"}
        btn1={"movie"}
        btn2={"tv"}
        activeBtn={categories}
      />
      <div className="flex flex-wrap justify-center mt-8">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={breakpoints}
        >
          {categoryData &&
            categoryData.results &&
            categoryData.results.map((item) => (
              <SwiperSlide key={item.id}>
                <Card movie={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Most Rated Section */}
      <Switch
        onclick={handleRatedCategoryChange}
        topic={"Top Rated"}
        btn1={"movie"}
        btn2={"tv"}
        activeBtn={ratedCategory}
      />
      <div className="flex flex-wrap justify-center mt-8">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={breakpoints}
        >
          {ratedData &&
            ratedData.results &&
            ratedData.results.map((item) => (
              <SwiperSlide key={item.id}>
                <Card movie={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
