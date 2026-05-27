import React, { useCallback, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
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
    } finally{
      setLoading(false);
    }
  };
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
          className="h-[450px] w-full max-w-md space-y-3 rounded-2xl bg-white p-8 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]"
        >
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
                name="firstName"
                className="rounded-md border border-neutral-300 px-2 py-1 font-normal"
                value={user.firstName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <p>Last Name</p>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="rounded-md border border-neutral-300 px-2 py-1 font-normal"
                value={user.lastName}
                onChange={handleChange}
                required
                disabled={loading}

              />
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-medium">Email</p>
            <input
              type="text"
              name="email"
              placeholder="example@gmail.com"
              className="w-full rounded-md border border-neutral-300 px-2 py-1"
              value={user.email}
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
                placeholder="create password"
                name="password"
                className="w-full rounded-md border border-neutral-300 px-2 py-1 pr-10"
                value={user.password}
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
              className="w-full cursor-pointer rounded-lg bg-blue-600 p-2 text-xl text-white hover:bg-blue-600/90"
            >
              Sign Up
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p>Already have an account? </p>
            <Link
              to={"/login"}
              className="underline transition-all duration-200 hover:text-gray-500"
            >
              Sign in{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
