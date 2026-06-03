import axios from "axios";
import React, { useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoading, setUser } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log("Response", res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));

        setTimeout(() => {
          navigate("/");
          dispatch(setLoading(false));
        }, 1500);
      } else {
        toast.error(res.data.message);
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("Login erro", error);
      let errorMessage = "Something went wrong. Please try again";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="flex h-screen bg-gray-300 dark:bg-gray-950 md:pt-14">
      {/* Left side image - hidden on mobile */}
      <div className="hidden items-center justify-center lg:flex lg:flex-1">
        <img src="/auth.jpg" className="h-full w-full object-cover" />
      </div>

      {/* Right side form - centered */}
      <div className="flex flex-1 items-center justify-center px-4 md:px-0">
        <form
          onSubmit={handleSubmit}
          className="h-[380px] w-full max-w-md space-y-3 rounded-2xl bg-white p-8 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]"
        >
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-medium">Login to your account</h2>
            <h4 className="text-base">
              Enter your details to login your account
            </h4>
          </div>

          <div className="space-y-1">
            <p className="font-medium">Email</p>
            <input
              type="email"
              id="email"
              autoComplete="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full rounded-md border border-neutral-300 p-2"
              value={input.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-1">
            <p className="font-medium">Password</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full rounded-md border border-neutral-300 p-2 pr-10"
                value={input.password}
                onChange={handleChange}
                required
                disabled={loading}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 transition hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-lg bg-blue-600 p-2 text-xl text-white hover:bg-blue-600/90"
            >
              {loading ? (
                <div className="flex
                items-center justify-center gap-2">
                  <FaSpinner className="animate-spin" size={18} />
                  <span>Please wait</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p>Don't have an account? </p>
            <Link
              to={"/signup"}
              className="underline transition-all duration-200 hover:text-gray-500"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
