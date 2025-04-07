import React, { useState } from "react";
import UserInfo from "./UserInfo";
import NotificationsContainer from "./NotificationsContainer";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleShowNotifications = () => {
    setShowNotifications((prevShowNotifications) => !prevShowNotifications);
  };

  return (
    <nav className="flex items-center bg-[#06071A] p-7 border-gray-800 border-b-1 border-l-1 h-[117px] text-white">
      <h1 className="mr-auto font-bold text-4xl">Dashboard</h1>
      <p className="relative mr-5">
        <span className="cursor-pointer" onClick={toggleShowNotifications}>
          🔔
        </span>
        {showNotifications && (
          <span className="top-10 right-0 absolute">
            <NotificationsContainer />
          </span>
        )}
      </p>
      <UserInfo />
    </nav>
  );
};

export default Navbar;
