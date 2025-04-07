import React from "react";
import UserInfo from "./UserInfo";

const Navbar = () => {
  return (
    <nav className="flex items-center bg-[#06071A] p-7 border-gray-800 border-b-1 border-l-1 h-[117px] text-white">
      <h1 className="mr-auto font-bold text-4xl">Dashboard</h1>
      <p className="mr-5">🔔</p>
      <UserInfo />
    </nav>
  );
};

export default Navbar;
