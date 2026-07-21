import React, { useCallback, useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { registerUser } from "../api/authApi";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!user.firstName.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!user.lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!user.email.includes("@")) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (user.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    return true;
  };
  const handleChange = useCallback((e) => {
    console.log(e);

    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    if (!validateForm()) return;
    dispatch(setLoading(true));
    try {
      const res = await registerUser(user)
      console.log("Response:", res.data);
      if (res.data.success) {
        toast.success(res.data.message || "Account created successfully!");

        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/login");
          dispatch(setLoading(false));
        }, 1500);
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Signup error:", error);

      let errorMessage = "Something went wrong. Please try again.";

      if (error.response?.status === 409) {
        errorMessage = "Email already registered";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message === "Network Error") {
        errorMessage = "Cannot connect to server. Check your connection.";
      }

      toast.error(errorMessage);
      dispatch(setLoading(false));
    } finally {
      setLoading(false);
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-4 py-12 sm:px-6 lg:px-8 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white/70 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/50">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create an account
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your details to register
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                name="firstName"
                className="block w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:border-indigo-400 placeholder:text-gray-400"
                value={user.firstName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                className="block w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:border-indigo-400 placeholder:text-gray-400"
                value={user.lastName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="block w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:border-indigo-400 placeholder:text-gray-400"
                value={user.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:border-indigo-400 placeholder:text-gray-400 pr-10"
                  value={user.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 disabled:hover:shadow-none"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <FaSpinner className="animate-spin" size={18} />
                  <span>Creating account...</span>
                </div>
              ) : (
                "Sign up"
              )}
            </button>
          </div>

          <div className="text-center text-sm pt-2">
            <span className="text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
