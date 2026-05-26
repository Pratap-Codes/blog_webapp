import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {Link} from "react-router-dom"

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    console.log(e)

    const {name, value} = e.target
    setUser((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user)
  }
  return (
    <div className="flex h-screen bg-gray-300">
      {/* Left side image - hidden on mobile */}
      <div className="hidden items-center justify-center lg:flex lg:flex-1">
        <img src="/auth.jpg" className="h-full w-full object-cover" />
      </div>

      {/* Right side form - centered */}
      <div className="flex flex-1 items-center justify-center px-4 md:px-0">
        <form 
        onSubmit={handleSubmit}
        className="h-[450px] w-full max-w-md space-y-3 rounded-2xl bg-white p-8 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-medium">Create an account</h2>
            <h4 className="text-base">
              Enter your details to create your account
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-2 py-1 font-medium">
            <div className="flex flex-col space-y-1">
              <p>First Name</p>
              <input
                type="text"
                placeholder="First Name"
                className="border border-neutral-300 px-2 py-1 font-normal rounded-md"
                value={user.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <p>Last Name</p>
              <input
                type="text"
                placeholder="Last Name"
                className="border border-neutral-300 px-2 py-1 font-normal rounded-md"
                value={user.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-medium">Email</p>
            <input
              type="text"
              placeholder="example@gmail.com"
              className="w-full border border-neutral-300 px-2 py-1 rounded-md"
              value={user.email}
                onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <p className="font-medium">Password</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="create password"
                className="w-full border border-neutral-300 px-2 py-1 pr-10 rounded-md"
                value={user.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <button className="p-2 bg-blue-600 rounded-lg w-full text-white text-xl cursor-pointer hover:bg-blue-600/90">Sign Up</button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p>Already have an account?  </p>
            <Link to={"/login"} className="underline hover:text-gray-500 transition-all duration-200">Sign in </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
