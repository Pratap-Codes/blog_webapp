import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBars,
  FaBook,
  FaMoon,
  FaRegComment,
  FaRegUser,
  FaSearch,
  FaSun,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/authSlice";
import { toggleTheme } from "../../redux/themeSlice";
import { LuNotebookPen } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import logo from "../../assets/logo.png";
import { logoutUser } from "../../api/authApi";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      const res = await logoutUser()
      if (res.data.success) {
        navigate("/");
        dispatch(setUser(null));
        toast.success(res.data.message);
        setDropdownOpen(false);
        setMobileMenuOpen(false);
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
    <div className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden border-b border-gray-200/90 bg-white/80 text-gray-800 shadow-[0_4px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/70 dark:text-gray-200 transition-all duration-300">
      <div className="mx-auto my-3 flex h-10 w-full max-w-5xl min-w-0 items-center justify-between px-4 sm:px-6">
        {/* Logo section */}
        <div className="flex min-w-0 items-center justify-center gap-2">
          <Link to={"/"}>
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-lg"
            />
          </Link>
          <input
            className="hidden lg:block w-48 lg:w-64 rounded-xl border border-gray-200 bg-white/50 p-2.5 pl-4 text-sm placeholder-gray-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-800/50 dark:text-white dark:focus:border-indigo-400"
            type="text"
            placeholder="Search blogs..."
          />
          <button className="hidden lg:flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-indigo-600 text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30">
            <FaSearch />
          </button>
        </div>

        {/* Desktop Nav section */}
        <nav className="hidden lg:flex items-center gap-7">
          <ul className="flex items-center justify-center text-lg text-gray-900 gap-8 dark:text-white">
            {navItems.map((items) => (
              <Link
                key={items.href}
                to={items.href}
                className="text-md font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {items.name}
              </Link>
            ))}
          </ul>

          <div className="flex gap-5 items-center">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white/50 text-gray-700 shadow-sm transition-all hover:bg-white dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {theme === "light" ? <FaMoon size={16} /> : <FaSun size={16} />}
            </button>

            {user ? (
              <div className="relative flex items-center" ref={dropdownRef}>
                <img
                  src={user.photoUrl}
                  alt="photo"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="h-10 w-10 cursor-pointer rounded-full object-cover ring-2 ring-transparent transition hover:ring-gray-400"
                />

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl transition-all duration-200 dark:border-gray-700/50 dark:bg-gray-900/80">
                    <div className="border-b border-gray-300 px-4 py-3 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

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
                  <button className="cursor-pointer rounded-xl border border-gray-200 bg-white/50 px-4 py-2 font-semibold text-gray-700 transition-all hover:bg-white hover:shadow-sm dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-700">
                    Login
                  </button>
                </Link>
                <Link to={"/signup"}>
                  <button className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white shadow-md transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30">
                    Signup
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white/50 text-gray-700 shadow-sm transition-all dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300"
          >
            {theme === "light" ? <FaMoon size={16} /> : <FaSun size={16} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl absolute top-full left-0 w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-4 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
              >
                {item.name}
              </Link>
            ))}

            {!user && (
              <div className="mt-6 flex flex-col gap-3 px-3">
                <Link to={"/login"} onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    Login
                  </button>
                </Link>
                <Link to={"/signup"} onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-md">
                    Signup
                  </button>
                </Link>
              </div>
            )}

            {user && (
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center px-3">
                  <div className="shrink-0">
                    <img className="h-10 w-10 rounded-full object-cover" src={user.photoUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-white">{user.firstName} {user.lastName}</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <button onClick={() => { navigate("/dashboard/profile"); setMobileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                    <FaRegUser /> Profile
                  </button>
                  <button onClick={() => { navigate("/dashboard/my-blog"); setMobileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                    <FaBook /> My Blog
                  </button>
                  <button onClick={() => { navigate("/dashboard/comments"); setMobileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                    <FaRegComment /> Comments
                  </button>
                  <button onClick={() => { navigate("/dashboard/write-blog"); setMobileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                    <LuNotebookPen /> Write Blog
                  </button>
                  <button onClick={logoutHandler} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10">
                    <CiLogout /> Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
