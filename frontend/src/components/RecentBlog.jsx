import React, { useEffect } from "react";
import { getPublishedBlog } from "../api/blogApi";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { setBlog } from "../redux/blogSlice";
import BlogCardList from "./BlogCardList";

const RecentBlog = () => {
  const { blog } = useSelector((store) => store.blog);
  // const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPublishedBlog = async () => {
      try {
        const res = await getPublishedBlog();
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPublishedBlog();
  }, [dispatch]);

  const categories = [
    "Technology",
    "Lifestyle",
    "Health & Fitness",
    "Education",
    "Business & Finance",
    "Travel",
    "Food & Recipes",
    "Entertainment",
  ];
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center space-y-3 p-4 pt-5">
      <h1 className="text-3xl font-bold text-black dark:text-white">
        Recent Blog
      </h1>
      <hr className="h-1.5 w-28 rounded-full border-0 bg-red-800" />
      <div className="mx-auto flex max-w-7xl gap-5 p-3">
        <div className="px-4 pt-10 md:px-0">
          {blog?.slice(0, 4).map((blog, index) => {
            return <BlogCardList key={index} blog={blog} />;
          })}
        </div>
        <div className="mt-11 hidden w-[350px] rounded-xl border border-black/30 bg-white p-3 md:block dark:bg-gray-600">
          <h1 className="mb-5 text-center text-2xl font-bold">
            Popular Categories
          </h1>
          <div className="flex flex-wrap gap-2">
            {categories.map((item, index) => (
              <span
                key={index}
                className="cursor-pointer rounded-lg border border-black/30 bg-gray-300 p-2 text-black transition-all hover:bg-gray-300/80 dark:bg-gray-500 dark:text-white hover:dark:bg-gray-500/80"
              >
                {item}
              </span>
            ))}
          </div>
          <h3 className="mt-4 text-2xl font-bold">Subscribe to Newsletter</h3>
          <p className="text-md text-neutral-400">
            Get the latest posts and updated delivered straight to your inbox
          </p>
          <div className="mx-auto mt-4 flex flex-col gap-2 sm:flex-row">
            <input
              className="h-10 w-full rounded-xl border border-bs-gray-900 bg-neutral-300 p-2 text-sm dark:bg-gray-800"
              type="email"
              placeholder="Enter your mail"
            />
            <button className="cursor-pointer rounded-lg border border-black/30 bg-gray-300 p-2 text-black transition-all hover:bg-gray-300/80 dark:bg-gray-500 dark:text-white hover:dark:bg-gray-500/80">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBlog;
