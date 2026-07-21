import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBlog, setLoading } from "../redux/blogSlice";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { createBlog } from "../api/blogApi";

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
    const res = await createBlog ({title, category})
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
    <div className="min-h-screen w-full py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white/70 p-6 md:p-10 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl border border-white/20 dark:border-gray-700/50 dark:bg-gray-800/60">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">create a blog</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            Share your knowledge, ideas, and stories with the world.
          </p>
        </div>
        
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:border-indigo-400 placeholder:text-gray-400"
              type="text"
              placeholder="Your Blog Title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <div className="relative">
              <select
                onChange={(e) => getSelectCategory(e.target.value)}
                className="block w-full appearance-none rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-400"
              >
                <option value="">-- Select a Category --</option>
                <option value="web-development">Web Development</option>
                <option value="seo">SEO</option>
                <option value="freelancing">Freelancing</option>
                <option value="ai-tools">AI & Tools</option>
                <option value="blogging">Blogging</option>
                <option value="digital-marketing">Digital Marketing</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              disabled={loading}
              onClick={createBlogHandler}
              type="submit"
              className="group relative flex w-full justify-center rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 disabled:hover:shadow-none sm:w-auto"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <FaSpinner className="animate-spin" size={18} />
                  <span>Please wait...</span>
                </div>
              ) : (
                "Create Blog"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
