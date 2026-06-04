import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBook,
  FaLongArrowAltUp,
  FaMoon,
  FaRegComment,
  FaRegUser,
  FaSearch,
  FaSun,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/authSlice";
import { toggleTheme } from "../../redux/themeSlice";
import { LuNotebookPen } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import logo from "../../../public/logo.png"

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.theme);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        dispatch(setUser(null));
        toast.success(res.data.message);
        setDropdownOpen(false);
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Logout failed. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "About", href: "/about" },
  ];

  return (
    <div className="fixed w-full border border-b-gray-300 bg-gray-200 text-gray-600 shadow-xl dark:border-0 dark:bg-gray-800 dark:text-gray-200">
      <div className="mx-auto my-3 flex h-10 w-full max-w-5xl items-center justify-between">
        {/* Logo section */}
        <div className="flex items-center justify-center gap-2">
          <Link to={"/"}>
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-12 rounded-full shadow-lg"
            />
          </Link>
          <input
            className="hidden rounded-lg border border-gray-800 bg-gray-400 p-2 placeholder-neutral-500 md:block dark:bg-gray-900 dark:text-black"
            type="text"
            placeholder="search"
          />
          <button className="cursor-pointer rounded-lg bg-black p-3 text-gray-200 dark:bg-gray-300 dark:text-black">
            <FaSearch />
          </button>
        </div>

        {/* Nav section */}
        <nav className="flex items-center md:gap-7">
          <ul className="flex items-center justify-center text-lg text-gray-900 md:gap-8 dark:text-white">
            {navItems.map((items) => (
              <Link
                key={items.href}
                to={items.href}
                className="text-md font-semibold"
              >
                {items.name}
              </Link>
            ))}
          </ul>

          <div className="flex gap-5">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="cursor-pointer rounded-md bg-black px-3 text-gray-200 shadow-lg dark:bg-gray-300 dark:text-black"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            {user ? (
              // ✅ Profile image + dropdown wrapper
              <div className="relative flex items-center" ref={dropdownRef}>
                <img
                  src={user.photoUrl}
                  alt="photo"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="h-10 w-10 cursor-pointer rounded-full object-cover ring-2 ring-transparent transition hover:ring-gray-400"
                />

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute top-12 z-50 w-48 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
                    {/* User info */}
                    <div className="border-b border-gray-300 px-4 py-3 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu items */}
                    <ul className="py-1">
                      <li>
                        <button
                          onClick={() => {
                            navigate("/dashboard/profile");
                            setDropdownOpen(false);
                          }}
                          className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          <FaRegUser />
                          <span>Profile</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            navigate("/dashboard/my-blog");
                            setDropdownOpen(false);
                          }}
                          className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          <FaBook />
                          <span>My Blog</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            navigate("/dashboard/comments");
                            setDropdownOpen(false);
                          }}
                          className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          <FaRegComment />

                          <span>Comments</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            navigate("/dashboard/write-blog");
                            setDropdownOpen(false);
                          }}
                          className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          <LuNotebookPen />

                          <span>Write Blog</span>
                        </button>
                      </li>
                    </ul>

                    {/* Logout */}
                    <div className="border-t border-gray-300 py-1 dark:border-gray-700">
                      <button
                        onClick={logoutHandler}
                        className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-gray-800"
                      >
                        <CiLogout />
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to={"/login"}>
                  <button className="cursor-pointer rounded-md bg-black p-2 font-semibold text-gray-200 shadow-lg dark:bg-gray-300 dark:text-black">
                    Login
                  </button>
                </Link>
                <Link to={"/signup"}>
                  <button className="cursor-pointer rounded-md bg-black p-2 font-semibold text-gray-200 shadow-lg dark:bg-gray-300 dark:text-black">
                    Signup
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
