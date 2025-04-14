import React from "react";

import searchIconImg from "../assets/searchIcon.svg";
import filterIconImg from "../assets/filterIcon.svg";

const ProjectsSearchFilter = () => {
  return (
    <div className="flex gap-3">
      <div className="relative w-[367px] h-[50px]">
        <input
          type="search"
          name="projects"
          placeholder="Search"
          className="bg-[#191A30] pr-4 pl-12 border border-[#282939] rounded-2xl outline-none w-full h-full text-white placeholder:text-white text-base placeholder:text-base"
        />
        <span className="top-1/2 left-4 absolute text-gray-400 -translate-y-1/2 transform">
          <img src={searchIconImg} alt="search" />
        </span>
      </div>

      <div className="flex justify-center items-center border-[#282939] border-1 border-dashed w-[50px] h-[50px]">
        <img src={filterIconImg} alt="filter projects" />
      </div>
    </div>
  );
};

export default ProjectsSearchFilter;
