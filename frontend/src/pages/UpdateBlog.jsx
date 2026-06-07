import React, { useRef } from "react";
import JoditEditor from 'jodit-react';
import { useNavigate } from "react-router-dom";

const UpdateBlog = () => {
  const editor = useRef(null)
  const navigate = useNavigate()
  return (
    <div className="pt-25 md:ml-[320px]">
      <div className="mx-auto max-w-5xl space-y-2 rounded-md bg-gray-300 p-5 dark:bg-gray-950">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Basic Blog Information
        </h1>
        <span className="text-sm font-medium text-black/60 dark:text-white/70">
          Make change to your blogs here. Click publish when you are done
        </span>
        <div className="flex gap-3 py-5">
          <button className="cursor-pointer rounded-lg bg-black p-2 font-medium text-white dark:bg-gray-300 dark:text-black">
            Publish
          </button>
          <button className="cursor-pointer rounded-lg  bg-red-500 p-2 font-medium text-white ">
            Remove Blog
          </button>
        </div>
        <div className="flex flex-col items-start gap-1">
          <label className="text-xl font-normal text-black dark:text-white">
            Title
          </label>
          <input
            className="mb-5 w-full rounded-md border border-none bg-gray-300 p-2 text-black dark:bg-gray-700 dark:text-white"
            type="text"
            placeholder="Enter a title"
          />
          <label className="text-xl font-normal text-black dark:text-white">
            Subtitle
          </label>
          <input
            className="mb-5 w-full rounded-md border border-none bg-gray-300 p-2 text-black dark:bg-gray-700 dark:text-white"
            type="text"
            placeholder="Enter your subtitle"
          />
        <label className="text-xl font-normal text-black dark:text-white">
            Description
          </label>
          <JoditEditor 
            ref={editor}
            height
          />
          <div className="mt-2 flex flex-col">
            <label className="text-xl font-normal text-black dark:text-white ">
            Category
          </label>
          <select
            className="mb-5  cursor-pointer rounded-md border border-none bg-gray-300 p-3 text-black dark:bg-gray-700 dark:text-white">
            <option value="">-- Select a Category --</option>
            <option value="web-development">Web Development</option>
            <option value="blogging">Blogging</option>
            <option value="digital-marketing">Digital Marketing</option>
          </select>
          </div>
          <div className="flex flex-col">
          <label className="text-xl font-normal text-black dark:text-white ">
            Thumbnail
          </label>
          <input 
          type="file"
          id="file"
          accept="image/*"
          className="mb-5 w-full rounded-md border border-none bg-gray-300 p-2 text-black dark:bg-gray-700 dark:text-white"
          />
          </div>
          <div className="flex gap-3">
            <button className="cursor-pointer rounded-lg  p-2 px-3 font-medium bg-gray-700 dark:text-white border border-gary-300" onClick={()=>navigate(-1)}>Back</button> 
            <button className="cursor-pointer rounded-lg bg-black p-2 px-3 font-medium text-white dark:bg-gray-300 dark:text-black">Save</button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
