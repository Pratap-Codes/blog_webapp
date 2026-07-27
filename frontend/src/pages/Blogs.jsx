import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setBlog } from '../redux/blogSlice'
import { getPublishedBlog } from '../api/blogApi'

const Blogs = () => {
  const { blog } = useSelector((store) => store.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch all published blogs on every mount (fixes the refresh issue)
  useEffect(() => {
    const fetchPublishedBlog = async () => {
      try {
        const res = await getPublishedBlog()
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPublishedBlog();
  }, [dispatch]);

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Latest <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-cyan-400">Articles</span>
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          Discover our newest insights, tutorials, and stories.
        </p>
      </div>

      {blog && blog.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blog.map((post) => (
            <div
              key={post._id}
              onClick={() => navigate(`/blogs/${post._id}`)}
              className="group cursor-pointer flex flex-col overflow-hidden rounded-3xl bg-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-gray-700/50 dark:bg-gray-800/60"
            >
              <div className="shrink-0 overflow-hidden aspect-16/10">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={post.thumbnail}
                  alt={post.title}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </p>
                  <div className="mt-2 block">
                    <p className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500 dark:text-gray-400 line-clamp-3">
                      {post.subtitle || "Click to read more about this topic..."}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="shrink-0">
                    <img
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
                      src={post.author?.photoUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.author?.firstName} {post.author?.lastName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      1 min read
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="rounded-full bg-indigo-100 p-6 dark:bg-gray-800">
            <svg className="w-12 h-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L18.5 8" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">No articles yet</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Check back later for new content.</p>
        </div>
      )}
    </div>
  )
}

export default Blogs
