import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCardList = ({ blog }) => {
  const navigate = useNavigate()
  return (
    <div className="mt-3 flex flex-col rounded-2xl border border-black/50 bg-white p-3 shadow-xl transition-all md:flex-row md:gap-4 dark:bg-gray-700">
      <div>
        <img
          src={blog.thumbnail}
          alt="thumbnail"
          className="rounded-lg transition-all hover:scale-101 md:w-[300px]"
        />
      </div>
      <div className="flex flex-col justify-center p-3">
        <span className="text-xl font-bold ">{blog.title}</span>
        <span className="text-md text-neutral-500 mt-1">{blog.subtitle}</span>
        <button
          onClick={() => navigate(`/blogs/${blog._id}`)}
          className="p-2 bg-indigo-800 text-white hover:bg-indigo-600 rounded-lg cursor-pointer mt-2">Read more</button>
      </div>
    </div>
  );
};

export default BlogCardList;
