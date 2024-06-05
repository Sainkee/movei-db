import React from "react";

export default function Switch({ onclick, topic, btn1, btn2, activeBtn }) {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-between  text-white pt-10">
      <div className=" mb-2 md:mb-0">
        <h1 className="text-2xl  md:text-3xl lg:text-4xl">{topic}</h1>
      </div>
      <div className="flex gap-3 p-[2px] max-w-fit bg-white text-black text-xs rounded-full font-semibold">
        <button
          className={`px-10 py-2 rounded-full whitespace-nowrap focus:text-white focus:outline-none ${
            activeBtn === btn1 ? "bg-custom-gradient" : ""
          }`}
          onClick={() => onclick(btn1)}
        >
          {btn1}
        </button>
        <button
          className={`px-10 py-2 rounded-full whitespace-nowrap focus:text-white focus:outline-none ${
            activeBtn === btn2 ? "bg-custom-gradient" : ""
          }`}
          onClick={() => onclick(btn2)}
        >
          {btn2}
        </button>
      </div>
    </div>
  );
}
