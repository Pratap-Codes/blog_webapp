import React, { useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { setBlog, setLoading } from "../redux/blogSlice";

const UpdateBlog = () => {
  const editor = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const config = useMemo(
    () => ({
      height: 400,
      width: "100%",
    }),
    []
  );

  const { blogId } = useParams();
  const { blog, loading } = useSelector((store) => store.blog);

  // ✅ Safe find — blog array may be empty on first render
  const selectBlog = blog?.find((b) => b._id === blogId);

  // ✅ Fetch blog from API if not found in Redux store (e.g. on hard refresh)
  useEffect(() => {
    if (!selectBlog) {
      const fetchBlog = async () => {
        try {
          dispatch(setLoading(true));
          const res = await axios.get(
            `http://localhost:8000/api/v1/blog/${blogId}`,
            { withCredentials: true }
          );
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
    }
  }, [blogId]);

  // ✅ Guard — must come BEFORE useState calls
  if (!selectBlog) {
    return (
      <div className="pt-25 md:ml-[320px] flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2 text-black dark:text-white">
          <FaSpinner className="animate-spin" size={22} />
          <span className="text-lg font-medium">Loading blog...</span>
        </div>
      </div>
    );
  };


  const [blogData, setBlogData] = useState({
    title: selectBlog.title,
    subtitle: selectBlog.subtitle,
    description: selectBlog.description,
    category: selectBlog.category,
  });

  const [previewThumbnail, setPreviewThumbnail] = useState(
    selectBlog.thumbnail
  );

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
    // ✅ Fixed: e.target.files (not e.target.file)
    const file = e.target.files?.[0];
    if (file) {
      setBlogData((prev) => ({ ...prev, thumbnail: file }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateBlogHandler = async () => {
    console.log("Param id", blogId)
    const formData = new FormData();
    // ✅ Fixed: proper two-argument syntax with semicolons
    formData.append("title", blogData.title);
    formData.append("subtitle", blogData.subtitle);
    formData.append("description", blogData.description);
    formData.append("category", blogData.category);
    if (blogData.thumbnail) {
      formData.append("file", blogData.thumbnail);
    }

    try {
      dispatch(setLoading(true));
      // ✅ Fixed: axios (not LuChartNoAxesColumnIncreasing)
      const res = await axios.put(
        `http://localhost:8000/api/v1/blog/${blogId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        // ✅ Fixed: res.data.message (not the string "res.data.success")
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

  return (
    <div className="pt-25 md:ml-[320px]">
      <div className="mx-auto max-w-5xl space-y-2 rounded-md bg-gray-300 p-5 dark:bg-gray-950">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Basic Blog Information
        </h1>
        <span className="text-sm font-medium text-black/60 dark:text-white/70">
          Make changes to your blog here. Click Publish when you are done.
        </span>

        <div className="flex gap-3 py-5">
          {/* ✅ Publish button at top wired to updateBlogHandler */}
          <button
            onClick={updateBlogHandler}
            disabled={loading}
            className="cursor-pointer rounded-lg bg-black p-2 font-medium text-white dark:bg-gray-300 dark:text-black disabled:opacity-60"
          >
            Publish
          </button>
          <button className="cursor-pointer rounded-lg bg-red-500 p-2 font-medium text-white">
            Remove Blog
          </button>
        </div>

        <div className="flex flex-col items-start gap-1">
          <label className="text-xl font-normal text-black dark:text-white">
            Title
          </label>
          <input
            value={blogData.title}
            onChange={handleChange}
            name="title"
            className="mb-5 w-full rounded-md border-none bg-gray-300 p-2 text-black dark:bg-gray-700 dark:text-white"
            type="text"
            placeholder="Enter a title"
          />

          <label className="text-xl font-normal text-black dark:text-white">
            Subtitle
          </label>
          <input
            value={blogData.subtitle}
            onChange={handleChange}
            name="subtitle"
            className="mb-5 w-full rounded-md border-none bg-gray-300 p-2 text-black dark:bg-gray-700 dark:text-white"
            type="text"
            placeholder="Enter your subtitle"
          />

          <label className="text-xl font-normal text-black dark:text-white">
            Description
          </label>
          <JoditEditor
            ref={editor}
            config={config}
            value={blogData.description}
            // ✅ Fixed: syncs description directly into blogData
            onChange={(newContent) =>
              setBlogData((prev) => ({ ...prev, description: newContent }))
            }
          />

          <div className="mt-2 flex flex-col">
            <label className="text-xl font-normal text-black dark:text-white">
              Category
            </label>
            {/* ✅ Fixed: onChange with e.target.value (not onValueChange) */}
            <select
              value={blogData.category}
              onChange={(e) => selectCategory(e.target.value)}
              className="mb-5 cursor-pointer rounded-md border-none bg-gray-300 p-3 text-black dark:bg-gray-700 dark:text-white"
            >
              <option value="">-- Select a Category --</option>
              <option value="web-development">Web Development</option>
              <option value="blogging">Blogging</option>
              <option value="digital-marketing">Digital Marketing</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xl font-normal text-black dark:text-white">
              Thumbnail
            </label>
            {/* ✅ Fixed: onChange wired to selectThumbnail */}
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={selectThumbnail}
              className="mb-5 w-full rounded-md border-none bg-gray-300 p-2 text-black dark:bg-gray-700 dark:text-white"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="Thumbnail preview"
                className="my-2 w-64 rounded-md"
              />
            )}
          </div>

          <div className="flex gap-3">
            <button
              className="cursor-pointer rounded-lg border border-gray-300 bg-gray-700 p-2 px-3 font-medium dark:text-white"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              onClick={updateBlogHandler}
              disabled={loading}
              className="cursor-pointer rounded-lg bg-black p-2 px-3 font-medium text-white dark:bg-gray-300 dark:text-black disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <FaSpinner className="animate-spin" size={18} />
                  <span>Please wait</span>
                </div>
              ) : (
                "Update Blog"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;