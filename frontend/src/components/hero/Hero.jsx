import React from "react";
import Background from "../../assets/background.jpg"

const Hero = () => {
  return (
    <div className="px-4 py-12 md:px-6 lg:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:gap-8">
        {/* text section */}
        <div className="flex-1 space-y-6 px-2 text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
              Explore the Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">Tech & Web</span> Trends
            </h2>
            <p className="max-w-xl text-lg text-gray-600 sm:text-xl dark:text-gray-300 mx-auto md:mx-0">
              Stay ahead with in-depth articles, tutorials, and insights on web
              development, digital marketing, and tech information.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <button className="w-full sm:w-auto cursor-pointer rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 hover:-translate-y-0.5">
              Get Started
            </button>
            <button className="w-full sm:w-auto cursor-pointer rounded-xl bg-white/50 px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm border border-gray-200 backdrop-blur-sm transition-all hover:bg-white dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:hover:bg-gray-700 hover:-translate-y-0.5">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex-1 w-full items-center justify-center p-4">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-25 blur transition duration-1000 group-hover:opacity-40"></div>
            <img
              src={Background}
              alt="Blog-BG"
              className="relative h-[300px] w-full rounded-2xl object-cover shadow-2xl md:h-[450px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
