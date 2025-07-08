import { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import NotificationsContainer from "./NotificationsContainer";
import { useDashboardContext } from "../store/DashboardContext";

import inviteUsersImg from "../assets/inviteUsers.svg";
import bellImg from "../assets/bell.svg";

const Navbar = () => {
  const { projectData, updateProjectData } = useDashboardContext();
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const currentUrl = window.location.href;
    const projectIdIndex =
      currentUrl.split("/").findIndex((segment) => segment === "project") + 1;
    const projectId = currentUrl.split("/")[projectIdIndex];

    if (projectId && projectId !== projectData?._id) {
      updateProjectData(projectId, "Dashboard");
    }
  }, [projectData?._id]);

  const toggleShowNotifications = () => {
    setShowNotifications((prevShowNotifications) => !prevShowNotifications);
  };

  const projectTitle = projectData?.title || null;

  return (
    <nav className="flex items-center bg-[#06071A] p-7 border-gray-800 border-b-1 border-l-1 h-[95px] text-white">
      <h1
        className={`mr-auto ${
          projectTitle ? "text-xl" : "font-bold text-4xl"
        } `}
      >
        {projectTitle || "Dashboard"}
      </h1>
      {projectTitle && (
        <span className="mr-5 p-1 cursor-pointer">
          <img
            className="hover:scale-110 transition"
            src={inviteUsersImg}
            alt="invite users"
          />
        </span>
      )}
      <div className="relative mr-5">
        <button
          className="p-1 cursor-pointer"
          onClick={toggleShowNotifications}
        >
          <img
            src={bellImg}
            className="hover:scale-110 transition"
            alt="notifications"
          />
        </button>
        {showNotifications && (
          <div className="top-15 right-0 z-10 absolute">
            <NotificationsContainer />
          </div>
        )}
      </div>
      <UserInfo />
    </nav>
  );
};

export default Navbar;
