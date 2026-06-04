import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSpinner,
} from "react-icons/fa";
import userPlaceholder from "../assets/user.png";

const EditProfileDialog = ({ isOpen, onClose }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ local state, not Redux
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth); // ✅ single useSelector

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    occupation: "",
    bio: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    github: "",
    file: null,
  });


  useEffect(() => {
    if (user) {
      setInput({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        occupation: user.occupation || "",
        bio: user.bio || "",
        facebook: user.facebook || "",
        linkedin: user.linkedin || "",
        instagram: user.instagram || "",
        github: user.github || "",
        file: null,
      });
    }
  }, [user]);

  const changeEventHandle = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput((prev) => ({ ...prev, file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("bio", input.bio);
    formData.append("occupation", input.occupation);
    formData.append("instagram", input.instagram);
    formData.append("facebook", input.facebook);
    formData.append("github", input.github);
    formData.append("linkedin", input.linkedin);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:8000/api/v1/user/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        onClose(); // ✅ close dialog on success
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-2xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-2xl font-bold text-gray-400 hover:text-gray-600 dark:hover:text-white"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-black dark:text-white">
          Edit your profile
        </h2>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Make changes to your profile here
        </p>

        {/* Avatar preview */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-gray-300 dark:border-gray-600">
            <img
              src={preview || user?.photoUrl || userPlaceholder}
              alt="preview"
              className="h-full w-full object-cover"
            />
          </div>
          <label className="cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            Choose a picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={changeFileHandler}
            />
          </label>
        </div>

        {/* First & Last Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { label: "First Name", id: "firstName", placeholder: "John" },
            { label: "Last Name", id: "lastName", placeholder: "Doe" },
          ].map(({ label, id, placeholder }) => (
            <div key={id} className="flex flex-col gap-1">
              <label
                htmlFor={id}
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {label}
              </label>
              <input
                type="text"
                id={id}
                name={id}
                placeholder={placeholder}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                onChange={changeEventHandle}
                value={input[id]}
              />
            </div>
          ))}
        </div>

        {/* Occupation */}
        <div className="mt-4 flex flex-col gap-1">
          <label
            htmlFor="occupation"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Occupation
          </label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            placeholder="e.g. Software Engineer"
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            onChange={changeEventHandle}
            value={input.occupation}
          />
        </div>

        {/* Social URL inputs */}
        <div className="mt-4 flex flex-col gap-4">
          {[
            { label: "Facebook URL",  id: "facebook",  placeholder: "https://facebook.com/yourprofile" },
            { label: "GitHub URL",    id: "github",    placeholder: "https://github.com/yourhandle" },
            { label: "LinkedIn URL",  id: "linkedin",  placeholder: "https://linkedin.com/in/yourprofile" },
            { label: "Instagram URL", id: "instagram", placeholder: "https://instagram.com/yourhandle" },
          ].map(({ label, id, placeholder }) => (
            <div key={id} className="flex flex-col gap-1">
              <label
                htmlFor={id}
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {label}
              </label>
              <input
                type="url"
                id={id}
                name={id}
                placeholder={placeholder}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                onChange={changeEventHandle}
                value={input[id]}
              />
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="mt-4 flex flex-col gap-1">
          <label
            htmlFor="bio"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            placeholder="Tell us about yourself..."
            className="resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            onChange={changeEventHandle}
            value={input.bio}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          onClick={submitHandler}
          className="mt-6 w-full cursor-pointer rounded-md bg-black py-2 font-bold text-white transition hover:opacity-85 disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin" size={18} />
              <span>Please wait</span>
            </div>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};

const Profile = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen pt-16 md:ml-[350px]">
      <div className="mx-auto mt-10 max-w-4xl px-4">
        <div className="flex flex-col gap-10 rounded-lg bg-white p-6 shadow-xl md:flex-row md:p-10 dark:bg-gray-800">
          {/* Avatar + social links */}
          <div className="flex flex-col items-center justify-center gap-3 p-2">
            <div className="h-40 w-40 overflow-hidden rounded-full border">
              <img
                src={user?.photoUrl || userPlaceholder}
                alt="User Photo"
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-center text-lg font-semibold text-black dark:text-white">
              {user?.occupation}
            </h1>

            {/* ✅ External links now use <a> not <Link> */}
            <div className="flex items-center gap-4">
              <a
                href={user?.facebook || "#"}
                target="_blank"
                rel="noreferrer"
                className="text-xl text-black dark:text-white"
              >
                <FaFacebook />
              </a>
              <a
                href={user?.github || "#"}
                target="_blank"
                rel="noreferrer"
                className="text-xl text-black dark:text-white"
              >
                <FaGithub />
              </a>
              <a
                href={user?.linkedin || "#"}
                target="_blank"
                rel="noreferrer"
                className="text-xl text-black dark:text-white"
              >
                <FaLinkedin />
              </a>
              <a
                href={user?.instagram || "#"}
                target="_blank"
                rel="noreferrer"
                className="text-xl text-black dark:text-white"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-center text-3xl font-bold text-black md:text-start dark:text-white">
              Welcome back {user?.firstName}
            </h1>
            <p>
              <span className="text-md font-semibold">Email: </span>
              {user?.email}
            </p>
            <div className="my-5 flex flex-col items-start gap-2">
              <label className="font-semibold text-gray-700 dark:text-gray-300">
                About Me
              </label>
              <p className="rounded-lg border p-4 text-sm text-gray-700 dark:border-gray-600 dark:text-gray-300">
                {user?.bio || "No bio added yet."}
              </p>
            </div>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="w-fit cursor-pointer rounded-xl bg-black p-2 px-4 font-medium text-white dark:bg-gray-400 dark:text-black"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <EditProfileDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default Profile;