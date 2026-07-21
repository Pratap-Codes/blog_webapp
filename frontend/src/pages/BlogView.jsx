import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FaShareNodes } from "react-icons/fa6";
import {
  FaHeart,
  FaRegHeart,
  FaRegCommentDots,
  FaPaperPlane,
} from "react-icons/fa6";
import axiosInstance from "../api/axiosInstance";
import { setBlog } from "../redux/blogSlice";

const getReadTime = (htmlContent) => {
  if (!htmlContent) return "< 1 min read";
  const text = htmlContent
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordCount = text.split(" ").filter(Boolean).length;
  const minutes = Math.ceil(wordCount / 200);
  return minutes < 1 ? "< 1 min read" : `${minutes} min read`;
};

const BlogView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogId = params.blogId;
  const { blog } = useSelector((store) => store.blog);
  const { user } = useSelector((store) => store.auth);
  const selectedBlog = blog?.find((item) => item._id === blogId);
  const [activeBlog, setActiveBlog] = useState(selectedBlog || null);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/blogs/${blogId}`;
  }, [blogId]);
  const [blogLike, setBlogLike] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(!selectedBlog);

  useEffect(() => {
    if (selectedBlog) {
      setActiveBlog(selectedBlog);
      setIsLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/blog/${blogId}`);
        if (res.data.success) {
          setActiveBlog(res.data.blog);
          dispatch(setBlog([res.data.blog]));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, dispatch, selectedBlog]);

  useEffect(() => {
    if (!activeBlog) return;
    setBlogLike(activeBlog.likes?.length || 0);
    setLiked(Boolean(user?._id && activeBlog.likes?.includes(user._id)));
  }, [activeBlog, user]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: activeBlog.title,
          text: activeBlog.subtitle || activeBlog.title,
          url: shareUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Unable to share this blog right now");
    }
  };

  const handleLikeToggle = async () => {
    try {
      if (!activeBlog?._id) return;
      if (!user?._id) {
        toast.error("Please login to like this blog");
        return;
      }

      const action = liked ? "dislike" : "like";
      const res = await axiosInstance.get(`/blog/${activeBlog._id}/${action}`);

      if (res.data.success) {
        const updatedLikes = liked ? blogLike - 1 : blogLike + 1;
        setBlogLike(updatedLikes);
        setLiked(!liked);
        setActiveBlog((currentBlog) =>
          currentBlog
            ? {
              ...currentBlog,
              likes: liked
                ? currentBlog.likes.filter((id) => id !== user._id)
                : [...(currentBlog.likes || []), user._id],
            }
            : currentBlog,
        );

        if (blog?.length) {
          const updatedBlogData = blog.map((post) =>
            post._id === activeBlog._id
              ? {
                ...post,
                likes: liked
                  ? post.likes.filter((id) => id !== user._id)
                  : [...(post.likes || []), user._id],
              }
              : post,
          );
          dispatch(setBlog(updatedBlogData));
        }

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update like");
    }
  };

  if (isLoading) {
    return <div className="pt-15 text-center text-xl text-white">Loading....</div>;
  }

  if (!activeBlog) {
    return <div className="pt-15 text-center text-xl text-white">Blog not found.</div>;
  }


  return (
    <div className="px-4 pb-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-xl sm:p-10 lg:p-12 dark:border-gray-700/50 dark:bg-gray-800/80">
        <div className="mb-8 flex items-center gap-3 text-sm font-medium text-gray-500 dark:text-gray-400">
          <button
            className="cursor-pointer transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            onClick={() => navigate(`/`)}
          >
            Home
          </button>
          <IoIosArrowForward className="size-4" />
          <button
            onClick={() => navigate(`/blogs`)}
            className="cursor-pointer transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Blogs
          </button>
          <IoIosArrowForward className="size-4" />
          <span className="max-w-50 truncate text-gray-900 sm:max-w-xs dark:text-white">
            {activeBlog.title}
          </span>
        </div>

        <div className="my-4">
          <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            {activeBlog.title}
          </h1>
        </div>

        <div className="my-8 flex flex-wrap items-center justify-between gap-4 border-y border-gray-200 py-6 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img
              className="size-12 rounded-full object-cover shadow-md ring-2 ring-indigo-50 dark:ring-indigo-900/30"
              src={
                activeBlog.author?.photoUrl ||
                "https://via.placeholder.com/48?text=A"
              }
              alt="author"
            />
            <div>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {activeBlog.author?.firstName || "Author"}{" "}
                {activeBlog.author?.lastName || ""}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Author</p>
            </div>
          </div>
          <div className="flex flex-col text-sm text-gray-500 sm:text-right dark:text-gray-400">
            <span>
              Published on{" "}
              {new Date(activeBlog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="mt-1 font-medium text-indigo-600 dark:text-indigo-400">
              {getReadTime(activeBlog.description)}
            </span>
          </div>
        </div>

        <div className="my-8 overflow-hidden rounded-2xl shadow-xl">
          <img
            src={activeBlog.thumbnail}
            alt="thumbnail"
            width={1000}
            height={500}
            className="w-full object-cover transition-transform duration-300 hover:scale-102"
          />
        </div>

        {activeBlog.subtitle && (
          <p className="mb-8 border-l-4 border-indigo-500 pl-4 text-lg text-gray-600 italic md:text-xl dark:text-gray-300">
            {activeBlog.subtitle}
          </p>

        )}

        {activeBlog.description && (
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white/60 p-5 text-base leading-8 text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-200">
            <div
              className="space-y-4"
              dangerouslySetInnerHTML={{ __html: activeBlog.description }}
            />
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-200">
          <button
            type="button"
            onClick={handleLikeToggle}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200 ${liked
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-600 ring-1 ring-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700"
              }`}
          >
            {liked ? <FaHeart className="size-4" /> : <FaRegHeart className="size-4" />}
            <span>{blogLike}</span>
          </button>

          <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-gray-600 ring-1 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700">
            <FaRegCommentDots className="size-4 text-indigo-500 dark:text-indigo-400" />
            <span>{activeBlog.comments?.length || 0} comments</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-gray-600 ring-1 ring-gray-200 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700"
          >
            <FaShareNodes className="size-4 text-indigo-500 dark:text-indigo-400" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
