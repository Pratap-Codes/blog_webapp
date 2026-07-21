import React from "react";
import ProfileSidebar from "../components/dashboard/ProfileSidebar";
import { Outlet } from "react-router-dom";
import Profile from "./Profile";

const Dashboard = () => {
  return (
    <div className="flex w-full">
      <ProfileSidebar />
      <div className="flex-1 w-full min-w-0">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Dashboard;
