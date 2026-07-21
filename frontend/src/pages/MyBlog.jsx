import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBlog } from "../redux/blogSlice";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiGlass } from "react-icons/ci";
import toast from "react-hot-toast";
import { deleteBlogById, getOwnBlogs } from "../api/blogApi";

const YourBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blog } = useSelector((store) => store.blog);

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef({});

  // Fetch user's blogs
  const getOwnBlog = async () => {
    try {
      const res = await getOwnBlogs()

      if (res.data.success) {
        dispatch(setBlog(res.data.blogs));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle delete blog
  const deleteBlog = async (id) => {
    try {
      
      const res = await deleteBlogById(id)
      if(res.data.success){
        const updateBlogData = blog.filter((blogItem) => blogItem?._id !== id)
        dispatch(setBlog(updateBlogData))
        toast.success("Blog deleted successfully")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  

  useEffect(() => {
    getOwnBlog();

    const handleClickOutside = (e) => {
      const isOutsideAll = Object.values(dropdownRef.current).every(
        (ref) => !ref || !ref.contains(e.target)
      )
      if (isOutsideAll) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="min-h-screen w-full py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white/70 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl border border-white/20 dark:border-gray-700/50 dark:bg-gray-800/60 text-gray-900 dark:text-white">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">My Blogs</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{blog.length} posts total</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button 
              onClick={() => navigate('/dashboard/write-blog')}
              className="inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:shadow-lg hover:shadow-indigo-500/30 cursor-pointer"
            >
              Write New Blog
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white/50 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="w-full overflow-visible">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
              <thead className="bg-gray-50/50 dark:bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Title</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Category</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Date</th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {blog.length > 0 ? (
                  blog.map((item) => (
                    <tr
                      key={item._id}
                      className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/50"
                    >
                      {/* Thumbnail + Title */}
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-12 w-16 rounded-lg object-cover shadow-sm"
                          />
                          <span className="font-medium text-gray-900 dark:text-white truncate max-w-[200px]">{item.title}</span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="whitespace-nowrap px-6 py-4 text-gray-600 dark:text-gray-300">
                        <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/30">
                          {item.category}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-6 py-4 text-gray-600 dark:text-gray-300">
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>

                      {/* Action */}
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          {/* View Button */}
                          <button
                            onClick={() => navigate(`/blogs/${item._id}`)}
                            className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20 transition-colors cursor-pointer"
                          >
                            <FaEye />
                            View
                          </button>

                          {/* Dropdown */}
                          <div className="relative" ref={(el) => (dropdownRef.current[item._id] = el)}>
                            <button
                              onClick={() =>
                                setOpenDropdown(
                                  openDropdown === item._id ? null : item._id
                                )
                              }
                              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer"
                            >
                              <BsThreeDotsVertical size={18} />
                            </button>

                            {openDropdown === item._id && (
                              <div className="absolute right-0 z-50 mt-2 w-36 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
                                {/* Edit */}
                                <button
                                  onClick={() =>{
                                    navigate(`/dashboard/write-blog/${item._id}`)
                                  }}
                                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                                >
                                  <FaEdit className="text-gray-400 dark:text-gray-500" />
                                  Edit
                                </button>

                                {/* Delete */}
                                <button
                                  onClick={() => deleteBlog(item._id)}
                                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 cursor-pointer border-t border-gray-100 dark:border-gray-700"
                                >
                                  <FaTrash className="text-red-500 dark:text-red-400" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-12 text-center text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <CiGlass className="h-12 w-12 text-gray-400 mb-4" />
                        <p>No blogs found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourBlog;