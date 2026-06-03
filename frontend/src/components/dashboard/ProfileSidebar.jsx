import React from "react";
import { NavLink } from "react-router-dom";
import { FaBook, FaRegComment, FaRegUser } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";

const ProfileSidebar = () => {
  return (
    <div className="fixed mt-16 hidden h-screen w-[300px] space-y-2 border-r-1 border-gray-300 bg-white p-10 md:block dark:border-gray-700 dark:bg-gray-950">
      <div className="space-y-2 px-3 pt-10 text-center">
        <NavLink
          to={"/dashboard/profile"}
          className={({ isActive }) =>
            `text-2xl ${isActive ? "bg-gray-800 text-white dark:bg-gray-900" : "bg-transparent"} flex w-full cursor-pointer items-center gap-2 rounded-xl p-3 font-medium text-gray-950 dark:text-white`
          }
        >
          <FaRegUser className="size-4" />
          <span>Profile</span>
        </NavLink>
        <NavLink
          to={"/dashboard/my-blog"}
          className={({ isActive }) =>
            `text-2xl ${isActive ? "bg-gray-800 text-white dark:bg-gray-900" : "bg-transparent"} flex w-full cursor-pointer items-center gap-2 rounded-xl p-3 font-medium text-gray-950 dark:text-white`
          }
        >
          <FaBook />
          <span>My Blog</span>
        </NavLink>
        <NavLink
          to={"/dashboard/comments"}
          className={({ isActive }) =>
            `text-2xl ${isActive ? "bg-gray-800 text-white dark:bg-gray-900" : "bg-transparent"} flex w-full cursor-pointer items-center gap-2 rounded-xl p-3 font-medium text-gray-950 dark:text-white`
          }
        >
          <FaRegComment />
          <span>Comment</span>
        </NavLink>
        <NavLink
          to={"/dashboard/write-blog"}
          className={({ isActive }) =>
            `text-2xl ${isActive ? "bg-gray-800 text-white dark:bg-gray-900" : "bg-transparent"} flex w-full cursor-pointer items-center gap-2 rounded-xl p-3 font-medium dark:text-white`
          }
        >
          <LuNotebookPen />
          <span>Write Blog</span>
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileSidebar;
