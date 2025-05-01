import React from "react";
import { Navbar } from "../components";
import { Outlet } from "react-router-dom";
import DashboardContextProvider from "../store/DashboardContext";
import Sidebar from "../components/Sidebar/Sidebar.jsx";

const DashboardLayout = () => {
  return (
    <DashboardContextProvider>
      <div className="grid grid-cols-[auto_1fr]  bg-[#06071A] text-white">
        <div className="flex">
          <Sidebar />
        </div>
        <div>
          <Navbar />
          <div className="flex flex-col border-gray-800 border-l-1 min-h-[calc(100vh-117px)]">
            <Outlet />
          </div>
        </div>
      </div>
    </DashboardContextProvider>
  );
};

export default DashboardLayout;
