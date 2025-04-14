import React from "react";
import { Navbar } from "../components";
import { Outlet } from "react-router-dom";
import DashboardContextProvider from "../store/DashboardContext";

const DashboardLayout = () => {
  return (
    <DashboardContextProvider>
      <div className="grid grid-cols-[auto_1fr] bg-[#06071A] text-white">
        {/* <Sidebar /> */}
        <aside className="w-[243px] h-screen"></aside>
        <div>
          <Navbar />
          <div className="flex flex-col p-7 border-gray-800 border-l-1 min-h-[calc(100vh-117px)]">
            <Outlet />
          </div>
        </div>
      </div>
    </DashboardContextProvider>
  );
};

export default DashboardLayout;
