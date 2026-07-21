import React from "react";
import { NavLink } from "react-router-dom";
import { FaBook, FaRegComment, FaRegUser } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";

const ProfileSidebar = () => {
  return (
    <div className="sticky top-20 shrink-0 hidden h-[calc(100vh-5rem)] w-[280px] sm:w-[320px] flex-col overflow-y-auto border-r border-white/20 bg-white/40 p-6 backdrop-blur-xl md:flex dark:border-gray-700/50 dark:bg-gray-800/40 shadow-lg z-10">
      <div className="space-y-3 pt-6">
        <NavLink
          to={"/dashboard/profile"}
          className={({ isActive }) =>
            `flex w-full cursor-pointer items-center gap-4 rounded-2xl p-4 font-semibold transition-all duration-300 ${isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-gray-700 hover:bg-white/60 dark:text-gray-300 dark:hover:bg-gray-700/50"}`
          }
        >
          <FaRegUser className="text-xl" />
          <span className="text-lg">Profile</span>
        </NavLink>
        <NavLink
          to={"/dashboard/my-blog"}
          className={({ isActive }) =>
            `flex w-full cursor-pointer items-center gap-4 rounded-2xl p-4 font-semibold transition-all duration-300 ${isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-gray-700 hover:bg-white/60 dark:text-gray-300 dark:hover:bg-gray-700/50"}`
          }
        >
          <FaBook className="text-xl" />
          <span className="text-lg">My Blog</span>
        </NavLink>
        <NavLink
          to={"/dashboard/comments"}
          className={({ isActive }) =>
            `flex w-full cursor-pointer items-center gap-4 rounded-2xl p-4 font-semibold transition-all duration-300 ${isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-gray-700 hover:bg-white/60 dark:text-gray-300 dark:hover:bg-gray-700/50"}`
          }
        >
          <FaRegComment className="text-xl" />
          <span className="text-lg">Comments</span>
        </NavLink>
        <NavLink
          to={"/dashboard/write-blog"}
          className={({ isActive }) =>
            `flex w-full cursor-pointer items-center gap-4 rounded-2xl p-4 font-semibold transition-all duration-300 ${isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-gray-700 hover:bg-white/60 dark:text-gray-300 dark:hover:bg-gray-700/50"}`
          }
        >
          <LuNotebookPen className="text-xl" />
          <span className="text-lg">Write Blog</span>
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileSidebar;
