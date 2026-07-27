import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/footer'

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-50 via-stone-50 to-zinc-100 text-gray-900 transition-colors duration-300 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 dark:text-gray-100">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
