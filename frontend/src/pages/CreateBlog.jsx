import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBlog, setLoading } from "../redux/blogSlice";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const CreateBlog = () => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { blog, loading } = useSelector(store => store.blog)
  console.log(blog)

  const getSelectCategory = (value) => {
    setCategory(value)
  }
 const createBlogHandler = async () => {
  if (!title.trim()) return toast.error("Title is required")
  if (!category) return toast.error("Please select a category")

  try {
    dispatch(setLoading(true))
    const res = await axios.post(
      `http://localhost:8000/api/v1/blog/`,
      { title, category },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    if (res.data.success) {
      const existing = blog || []
      dispatch(setBlog([...existing, res.data.blog]))
      navigate(`/dashboard/write-blog/${res.data.blog._id}`)
      toast.success(res.data.message)
    } else {
      toast.error("Something went wrong")
    }
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.message || "Something went wrong")
  } finally {
    dispatch(setLoading(false))
  }
}
  return (
    <div className="h-screen pt-20 md:ml-[350px]">
      <div className="mx-auto max-w-5xl bg-white p-4 md:p-10 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Lets create blog
        </h1>
        <span className="text-sm font-normal text-black/60 dark:text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
          numquam!
        </span>
        <div className="flex flex-col items-start gap-1 pt-10">
          <label className="text-xl font-normal text-black dark:text-white">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-5 w-full rounded-md border border-none bg-gray-300 p-2 text-black dark:bg-gray-700 dark:text-white"
            type="text"
            placeholder="Your Bog Name"
          />

          <label className="text-xl font-normal text-black dark:text-white">
            Category
          </label>
          <select
            onChange={(e) => getSelectCategory(e.target.value)}
            className="mb-5  cursor-pointer rounded-md border border-none bg-gray-300 p-3 text-black dark:bg-gray-700 dark:text-white">
            <option value="">-- Select a Category --</option>
            <option value="web-development">Web Development</option>
            <option value="blogging">Blogging</option>
            <option value="digital-marketing">Digital Marketing</option>
          </select>

          <button
            disabled={loading}
            onClick={createBlogHandler}
            type="submit"
            className="mt-2 cursor-pointer rounded-lg bg-black p-2 font-medium text-white dark:bg-gray-200 dark:text-black">

            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" size={18} />
                <span>Please wait</span>
              </div>
            ) : (
              "Create Blog"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
