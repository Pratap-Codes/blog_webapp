import React, {useState} from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {Link} from "react-router-dom"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
     
  
  return (
      <div className="flex h-screen bg-gray-300 md:pt-14">
      {/* Left side image - hidden on mobile */}
      <div className="hidden items-center justify-center lg:flex lg:flex-1">
        <img src="/auth.jpg" className="h-full w-full object-cover" />
      </div>

      {/* Right side form - centered */}
      <div className="flex flex-1 items-center justify-center px-4 md:px-0">
        <form className="h-[380px] w-full max-w-md space-y-3 rounded-2xl bg-white p-8 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-medium">Login to your account</h2>
            <h4 className="text-base">
              Enter your details to login your account
            </h4>
          </div>
      
          <div className="space-y-1">
            <p className="font-medium">Email</p>
            <input
              type="text"
              placeholder="Enter your email address"
              className="w-full border border-neutral-300 p-2 rounded-md"
            />
          </div>
          <div className="space-y-1">
            <p className="font-medium">Password</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-neutral-300 p-2 pr-10 rounded-md"
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
            <button className="p-2 bg-blue-600 rounded-lg w-full text-white text-xl cursor-pointer hover:bg-blue-600/90">Login</button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p>Don't have an account?  </p>
            <Link to={"/signup"} className="underline hover:text-gray-500 transition-all duration-200">Sign up </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
