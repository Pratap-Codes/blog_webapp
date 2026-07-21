import React from 'react'
import {Outlet} from "react-router-dom"
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/footer'

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />  
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
