import React from "react";
import { FaMoon, FaSearch } from "react-icons/fa";
import { Link, Links } from "react-router-dom";
const Navbar = () => {
  const user = false;
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
    <div className="fixed w-full border-b-gray-300 bg-white dark:border-b-gray-600 dark:bg-gray-800">
      <div className="mx-auto my-2 flex h-10 w-full max-w-5xl items-center justify-between">
        {/* Logo section */}
        <div className="flex items-center justify-center gap-1">
          <p className="text-2xl font-semibold">Logo</p>
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
            <button className="rounded-md p-3 dark:bg-gray-300 bg-black">
              <FaMoon />
            </button>
            {user ? (
              <div></div>
            ) : (
              <div className="flex gap-3">
                <Link
                to={"/login"}
                >
                  <button className="rounded-md p-2 font-semibold dark:bg-gray-300 bg-black">
                    Login
                  </button>
                </Link>
                <Link
                to={"/signup"}
                >
                  <button className="rounded-md p-2 font-semibold dark:bg-gray-300 bg-black">
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
