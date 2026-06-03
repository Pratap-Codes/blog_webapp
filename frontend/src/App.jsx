import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Navigate 
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyBlog from "./pages/MyBlog";
import Comments from "./pages/Comments";
import WriteBlog from "./pages/WriteBlog";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { index: true, element: <Navigate to="profile" replace /> }, // 👈 add this
          { path: "profile", element: <Profile /> },
          { path: "my-blog", element: <MyBlog /> },
          { path: "comments", element: <Comments /> },
          { path: "write-blog", element: <WriteBlog /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
        }}
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
