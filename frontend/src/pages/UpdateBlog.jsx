import React, { useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { setBlog, setLoading } from "../redux/blogSlice";
import { getBlogById } from "../api/blogApi";
import axiosInstance from "../api/axiosInstance";

const UpdateBlog = () => {
  const editor = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [published, setPublished] = useState(false);
  const config = useMemo(
    () => ({
      height: 400,
      width: "100%",
    }),
    [],
  );

  const { blogId } = useParams();
  const { blog, loading } = useSelector((store) => store.blog);
  const selectBlog = blog?.find((b) => b._id === blogId);
  const [blogData, setBlogData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  useEffect(() => {
    if (!selectBlog) {
      const fetchBlog = async () => {
        try {
          dispatch(setLoading(true));
          const res = await getBlogById(blogId);
          if (res.data.success) {
            dispatch(setBlog([res.data.blog]));
          }
        } catch (error) {
          console.log(error);
          toast.error("Failed to load blog. Please try again.");
        } finally {
          dispatch(setLoading(false));
        }
      };

      fetchBlog();
      return;
    }

    setBlogData({
      title: selectBlog.title || "",
      subtitle: selectBlog.subtitle || "",
      description: selectBlog.description || "",
      category: selectBlog.category || "",
    });
    setPreviewThumbnail(selectBlog.thumbnail || "");
    setPublished(Boolean(selectBlog.isPublished));
  }, [blogId, dispatch, selectBlog]);

  if (loading || !selectBlog) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-25 md:ml-80">
        <div className="flex items-center gap-2 text-black dark:text-white">
          <FaSpinner className="animate-spin" size={22} />
          <span className="text-lg font-medium">Loading blog...</span>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectCategory = (value) => {
    setBlogData((prev) => ({ ...prev, category: value }));
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData((prev) => ({ ...prev, thumbnail: file }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateBlogHandler = async () => {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("subtitle", blogData.subtitle);
    formData.append("description", blogData.description);
    formData.append("category", blogData.category);
    if (blogData.thumbnail) {
      formData.append("file", blogData.thumbnail);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `http://localhost:8000/api/v1/blog/${blogId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message || "Blog updated successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const togglePublishUnpublish = async (publish) => {
    const res = await axiosInstance.patch(`/blog/${blogId}?publish=${publish}`);
    if (res.data.message) {
      setPublished(!published);
      toast.success(res.data.message);
      navigate("/dashboard/my-blog");
    } else {
      toast.error("Failed to update");
    }
  };

  const toggleDeleteBlog = async (id) => {
    try {
      const res = await axiosInstance.delete(`/blog/delete/${id}`);
      if (res.data.success) {
        const updatedBlog = blog.filter((blogItem) => blogItem?.id !== id);
        dispatch(setBlog(updatedBlog));
        toast.success("Blog delete successfully");
        navigate("/dashboard/my-blog");
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/20 bg-white/70 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl md:p-10 lg:p-12 dark:border-gray-700/50 dark:bg-gray-800/60">
        <div className="mb-8 border-b border-gray-200 pb-6 dark:border-gray-700">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Update Blog
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Make changes to your blog here. Click Update when you are done.
          </p>
        </div>

        <div className="mb-8 flex gap-4">
          <button
            onClick={() =>
              togglePublishUnpublish(selectBlog.isPublished ? "false" : "true")
            }
            disabled={loading}
            className="flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-70 disabled:hover:shadow-none"
          >
            {selectBlog?.isPublished ? "Unpublished" : "Published"}
          </button>
          <button 
          onClick={() => toggleDeleteBlog(blogId)}
          className="rounded-xl border border-red-200 bg-red-50 px-6 py-2.5 text-sm font-semibold text-red-600 transition-all hover:border-red-300 hover:bg-red-100 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40">
            Remove Blog
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              value={blogData.title}
              onChange={handleChange}
              name="title"
              className="block w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm transition-all outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:border-indigo-400"
              type="text"
              placeholder="Enter a title"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Subtitle
            </label>
            <input
              value={blogData.subtitle}
              onChange={handleChange}
              name="subtitle"
              className="block w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm transition-all outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:border-indigo-400"
              type="text"
              placeholder="Enter your subtitle"
            />
          </div>

          <div className="prose-container">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <div className="overflow-hidden rounded-xl border border-gray-200 transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:border-gray-700">
              <JoditEditor
                ref={editor}
                config={config}
                value={blogData.description}
                onChange={(newContent) =>
                  setBlogData((prev) => ({ ...prev, description: newContent }))
                }
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <div className="relative">
              <select
                value={blogData.category}
                onChange={(e) => selectCategory(e.target.value)}
                className="block w-full appearance-none rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:border-indigo-400"
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
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Thumbnail
            </label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={selectThumbnail}
              className="block w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:text-gray-400 dark:file:bg-gray-700 dark:file:text-gray-200"
            />
            {previewThumbnail && (
              <div className="mt-4 max-w-sm overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                <img
                  src={previewThumbnail}
                  alt="Thumbnail preview"
                  className="w-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4 border-t border-gray-200 pt-6 dark:border-gray-700">
            <button
              onClick={() => navigate(-1)}
              className="rounded-xl border border-gray-200 bg-white/50 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-white dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={updateBlogHandler}
              disabled={loading}
              className="flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-70 disabled:hover:shadow-none"
            >
              {loading ? (
                <>
                  <FaSpinner className="mr-2 animate-spin" size={16} />
                  <span>Saving...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
