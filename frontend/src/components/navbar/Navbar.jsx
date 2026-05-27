import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/authSlice";
import { toggleTheme } from "../../redux/themeSlice";
const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const {theme} = useSelector(store =>store.theme)
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      }
    } catch (error) {
      console.log(error);
      let errorMessage =  "Logout failed. Please try again. "
      if(error.response?.data?.message){
        errorMessage = error.response.data.message;
      } else if(error.message) {
        errorMessage = error.message
      }
      toast.error(errorMessage)
    }
  };
  const navItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Blogs",
      href: "/blogs",
    },
    {
      name: "About",
      href: "/about",
    },
  ];

  return (
    <div className="fixed w-full border-b-gray-300 bg-gray-200 text-gray-800 dark:border-b-gray-600 dark:bg-gray-800 dark:text-gray-200">
      <div className="mx-auto my-2 flex h-10 w-full max-w-5xl items-center justify-between">
        {/* Logo section */}
        <div className="flex items-center justify-center gap-2">
          <Link to={"/"}>
            <img
              src="./logo.png"
              alt="Logo"
              className="h-12 w-12 rounded-full"
            />
          </Link>
          <input
            className="hidden rounded-lg border bg-gray-300 p-1 text-white md:block dark:bg-gray-700"
            type="text"
            placeholder="search"
          />
          <button className="rounded-lg bg-gray-400 p-2">
            <FaSearch />
          </button>
        </div>
        {/* Nav section */}
        <nav className="flex items-center md:gap-7">
          <ul className="flex items-center justify-center text-lg md:gap-8 dark:text-white">
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
          <div className="flex gap-3">
            <button 
            onClick={()=>dispatch(toggleTheme())}
            className="cursor-pointer rounded-md bg-black px-3 dark:bg-gray-300">
              {theme === 'light' ? <FaMoon /> : <FaSun/>}
            </button>
            {user ? (
              <div className="flex items-center justify-center gap-2">
                <img
                  src="/photo.png"
                  alt="photo"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <button
                  onClick={logoutHandler}
                  className="cursor-pointer rounded-md bg-black p-2 font-semibold dark:bg-gray-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to={"/login"}>
                  <button className="cursor-pointer rounded-md bg-black p-2 font-semibold dark:bg-gray-300">
                    Login
                  </button>
                </Link>
                <Link to={"/signup"}>
                  <button className="cursor-pointer rounded-md bg-black p-2 font-semibold dark:bg-gray-300">
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
