import React from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from "./pages/Home"
import Blogs from './pages/Blogs'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'


const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/about", element: <About /> }
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> }
])

const App = () => {
  return (
   <>
    <RouterProvider router={router} />
   </>
  )
}

export default App
