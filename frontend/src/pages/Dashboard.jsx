import React from "react";
import ProfileSidebar from "../components/dashboard/ProfileSidebar";
import { Outlet } from "react-router-dom";
import Profile from "./Profile";

const Dashboard = () => {
  return (
    <div className="flex bg-gray-200">
      <ProfileSidebar />
      <div className="flex-1">
        <Outlet /> 
        
      </div>
    </div>
  );
};

export default Dashboard;
