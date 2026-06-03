import React from "react";

const Hero = () => {
  return (
    <div className="px-4 md:px-0">
      <div className="mx-auto my-10 flex h-[600px] max-w-6xl flex-col items-center md:my-0 md:flex-row">
        {/* text section */}
        <div className="max-w-2xl px-2">
          <div className="">
            <h2 className="text-5xl font-bold dark:text-white">
              Explore the Latest Tech & Web Trends
            </h2>
            <h4 className="py-2 text-xl text-neutral-600 dark:text-neutral-200">
              Stay ahead with in depth articles tutorials and insights on web
              development digital marketing and tech information
            </h4>
          </div>

          <div className="flex space-x-5 py-2">
            <button className="cursor-pointer rounded-lg bg-black px-3 py-2 text-white transition-all duration-200 hover:scale-103">
              Get Started
            </button>
            <button className="cursor-pointer rounded-lg bg-neutral-300 px-3 py-2 transition-all duration-200 hover:scale-103">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex w-full items-center justify-center  shadow-2xl overflow-hidden rounded-lg md:w-auto">
          <img
            src="./background.jpg"
            alt="Blog-BG"
            className="h-[300px] w-[300px] rounded-lg shadow-2xl object-cover md:h-[400px] md:w-[600px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
