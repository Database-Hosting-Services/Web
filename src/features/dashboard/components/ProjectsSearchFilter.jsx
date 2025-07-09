import { useState } from "react";

import searchIconImg from "../assets/searchIcon.svg";
import filterIconImg from "../assets/filterIcon.svg";
import { useNavigate } from "react-router-dom";

const ProjectsSearchFilter = ({ projects, setFilteredProjects }) => {
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState("all");

  const handleFilterClick = () => {
    let nextFilter;
    if (filterStatus === "all") nextFilter = "active";
    else if (filterStatus === "active") nextFilter = "paused";
    else nextFilter = "all";

    setFilterStatus(nextFilter);

    if (nextFilter === "all") {
      setFilteredProjects(projects);
    } else if (nextFilter === "active") {
      setFilteredProjects(
        projects.filter((project) => project.status === "active"),
      );
    } else if (nextFilter === "paused") {
      setFilteredProjects(
        projects.filter((project) => project.status === "paused"),
      );
    }
  };

  return (
    <div className="flex gap-3 p-7">
      {/* --------------- Search input --------------- */}
      <div className="relative w-[367px] h-[50px]">
        <input
          type="search"
          name="projects"
          placeholder="Search"
          className="bg-[#191A30] [box-shadow:0_0_1000px_1000px#191A30_inset] pr-4 pl-12 border-[#282939] rounded-2xl focus:outline-none w-full h-full text-white autofill:text-text placeholder:text-white text-base placeholder:text-base"
        />
        <span className="top-1/2 left-4 absolute text-gray-400 -translate-y-1/2 transform">
          <img src={searchIconImg} alt="search" />
        </span>
      </div>
      {/* --------------- Filter --------------- */}
      <div
        onClick={handleFilterClick}
        className={`flex justify-center items-center border-[#282939] border-1 border-dashed w-[50px] h-[50px] cursor-pointer
    ${
      filterStatus === "active"
        ? "bg-[#00E100]"
        : filterStatus === "Paused"
        ? "bg-[#E1E100]"
        : "bg-transparent"
    }
  `}
        title="Sorted By"
      >
        <img src={filterIconImg} alt="filter projects" />
      </div>
      {/* --------------- New Project Button --------------- */}
      <div className="flex justify-center items-center">
        <button
          className="bg-custom-linear-gradient rounded-xl w-[170px] h-[50px] cursor-pointer"
          onClick={() => {
            navigate("/dashboard/new-project");
          }}
        >
          New Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsSearchFilter;
