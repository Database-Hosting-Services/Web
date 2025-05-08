import React, { useState } from "react";
import searchIconImg from "../assets/searchIcon.svg";
import filterIconImg from "../assets/filterIcon.svg";

const ProjectsSearchFilter = ({ projects, setFilteredProjects }) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleFilterClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleStatusSelect = (status) => {
    let newStatus = status;
    // لو المستخدم اختار نفس الفلتر اللي عليه، نرجعه للـ all
    if (filterStatus === status) {
      newStatus = "all";
    }

    setFilterStatus(newStatus);
    setIsMenuOpen(false);

    if (newStatus === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.status === newStatus),
      );
    }
  };

  const getFilterColor = () => {
    if (filterStatus === "active") return "bg-[#00E100]";
    if (filterStatus === "paused") return "bg-[#E1E100]";
    return "bg-transparent";
  };

  return (
    <div className="flex gap-3 p-7 relative">
      <div className="relative w-[367px] h-[50px]">
        <input
          type="search"
          name="projects"
          placeholder="Search"
          className="bg-[#191A30] pr-4 pl-12 border-[#282939] rounded-2xl focus:outline-none autofill:text-text
            [box-shadow:0_0_1000px_1000px#191A30_inset] w-full h-full text-white placeholder:text-white text-base placeholder:text-base"
        />
        <span className="top-1/2 left-4 absolute text-gray-400 -translate-y-1/2 transform">
          <img src={searchIconImg} alt="search" />
        </span>
      </div>

      <div className="relative">
        <div
          onClick={handleFilterClick}
          className={`flex justify-center items-center border-[#282939] border-1 border-dashed w-[50px] h-[50px] cursor-pointer ${getFilterColor()}`}
          title="Filter By Status"
        >
          <img src={filterIconImg} alt="filter projects" />
        </div>

        {isMenuOpen && (
          <div className="absolute top-[60px] right-0 bg-[#191A30]  rounded-lg  shadow-md z-10">
            <button
              onClick={() => handleStatusSelect("active")}
              className={`w-full px-4 py-2 text-left text-[#FFFFFF] hover:bg-[#2a2b45] rounded-lg${
                filterStatus === "active" ? "font-bold" : ""
              }`}
            >
              Active
            </button>
            <button
              onClick={() => handleStatusSelect("paused")}
              className={`w-full px-4 py-2 text-left text-[#FFFFFF] hover:bg-[#2a2b45] rounded-lg ${
                filterStatus === "paused" ? "font-bold" : ""
              }`}
            >
              Paused
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsSearchFilter;
