import React from 'react'
import {Outlet} from "react-router-dom"
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/footer'

const MainLayout = () => {
  return (
    <>
    <Navbar />  
        <Outlet />
    <Footer />
    </>
  )
}

export default MainLayout
