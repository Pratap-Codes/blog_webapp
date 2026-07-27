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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:bg-gray-800/90 border border-white/20 dark:border-gray-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200 cursor-pointer"
        >
          &times;
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Edit Profile
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Update your personal information and social links.
          </p>
        </div>

        {/* Avatar preview */}
        <div className="mb-8 flex flex-col items-center sm:flex-row sm:gap-6">
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-gray-700">
            <img
              src={preview || user?.photoUrl || userPlaceholder}
              alt="preview"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 flex flex-col items-center sm:mt-0 sm:items-start">
            <label className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20">
              Change Picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={changeFileHandler}
              />
            </label>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">JPG, JPEG, WEBP or PNG. Max size of 5 mb</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { label: "First Name", id: "firstName", placeholder: "John" },
              { label: "Last Name", id: "lastName", placeholder: "Doe" },
            ].map(({ label, id, placeholder }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {label}
                </label>
                <input
                  type="text"
                  id={id}
                  name={id}
                  placeholder={placeholder}
                  className="block w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:border-indigo-400 placeholder:text-gray-400"
                  onChange={changeEventHandle}
                  value={input[id]}
                />
              </div>
            ))}
          </div>

          {/* Occupation */}
          <div>
            <label
              htmlFor="occupation"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Occupation
            </label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              placeholder="e.g. Software Engineer"
              className="block w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:border-indigo-400 placeholder:text-gray-400"
              onChange={changeEventHandle}
              value={input.occupation}
            />
          </div>

          {/* Social URL inputs */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { label: "Facebook URL",  id: "facebook",  placeholder: "https://facebook.com/yourprofile" },
              { label: "GitHub URL",    id: "github",    placeholder: "https://github.com/yourhandle" },
              { label: "LinkedIn URL",  id: "linkedin",  placeholder: "https://linkedin.com/in/yourprofile" },
              { label: "Instagram URL", id: "instagram", placeholder: "https://instagram.com/yourhandle" },
            ].map(({ label, id, placeholder }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {label}
                </label>
                <input
                  type="url"
                  id={id}
                  name={id}
                  placeholder={placeholder}
                  className="block w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:border-indigo-400 placeholder:text-gray-400"
                  onChange={changeEventHandle}
                  value={input[id]}
                />
              </div>
            ))}
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              placeholder="Tell us about yourself..."
              className="block w-full resize-none rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:border-indigo-400 placeholder:text-gray-400"
              onChange={changeEventHandle}
              value={input.bio}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4 border-t border-gray-200 pt-6 dark:border-gray-700">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 bg-white/50 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-white dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            onClick={submitHandler}
            className="flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 disabled:hover:shadow-none cursor-pointer"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" size={16} />
                <span>Saving...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen w-full py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mt-10 max-w-4xl">
        <div className="overflow-hidden rounded-3xl bg-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl border border-white/20 dark:border-gray-700/50 dark:bg-gray-800/60">
          <div className="flex flex-col md:flex-row">
            {/* Left Column: Avatar + social links */}
            <div className="flex flex-col items-center justify-center bg-gray-50/50 p-10 dark:bg-gray-800/50 md:w-1/3 md:border-r md:border-gray-200 dark:md:border-gray-700">
              <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-gray-700">
                <img
                  src={user?.photoUrl || userPlaceholder}
                  alt="User Photo"
                  className="h-full w-full object-cover"
                />
              </div>
              <h1 className="mb-6 text-center text-lg font-medium text-indigo-600 dark:text-indigo-400">
                {user?.occupation || "Software Engineer"}
              </h1>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {[
                  { icon: FaFacebook, url: user?.facebook, color: "text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30" },
                  { icon: FaGithub, url: user?.github, color: "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" },
                  { icon: FaLinkedin, url: user?.linkedin, color: "text-blue-700 hover:bg-blue-50 dark:text-blue-500 dark:hover:bg-blue-900/30" },
                  { icon: FaInstagram, url: user?.instagram, color: "text-pink-600 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-900/30" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-all dark:bg-gray-800 dark:border dark:border-gray-700 ${social.color}`}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column: Info */}
            <div className="flex flex-col justify-center p-8 md:w-2/3 md:p-12">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  {user?.firstName} {user?.lastName}
                </h1>
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="mt-4 sm:mt-0 inline-flex items-center rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:shadow-lg hover:shadow-indigo-500/30 cursor-pointer"
                >
                  Edit Profile
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</h3>
                  <p className="mt-1 text-base text-gray-900 dark:text-white">{user?.email}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">About Me</h3>
                  <div className="mt-2 rounded-2xl bg-gray-50/50 p-6 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                    <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                      {user?.bio || "No bio added yet. Click edit profile to add one."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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