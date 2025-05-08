import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import rightArrow from "../assets/rightArrow.svg";
import ProjectsSearchFilter from "./ProjectsSearchFilter";

const ProjectsContainer = ({ allprojects }) => {
  const setFilteredProjects = useState(allprojects)[1];

  return (
    <>
      <ProjectsSearchFilter
        projects={allprojects}
        setFilteredProjects={setFilteredProjects}
      />
    </>
  );
};

const truncateDescription = (description) => {
  if (description.length > 30) {
    return description.substring(0, 30) + "...";
  }
  return description;
};

const SingleProject = ({ _id, title, description, isActive }) => {
  const navigate = useNavigate();

  const handleOpenProject = () => {
    navigate(`project/${_id}`);
  };

  return (
    <div className="grid grid-cols-1 grid-rows-2 bg-secondary p-3 m-8 rounded-2xl max-w-[345px] h-[180px] ">
      <div className="flex justify-between items-center p-4 border-b-gradient">
        <div className="">
          <h3 className="font-bold">{title}</h3>
          <p className="font-light text-gray-400">
            {truncateDescription(description)}
          </p>
        </div>
        <button className="p-1 cursor-pointer" onClick={handleOpenProject}>
          <img className="hover:scale-125 transition" src={rightArrow} alt="" />
        </button>
      </div>
      <div className="flex justify-between items-end p-4">
        {isActive ? (
          <>
            <p className="font-bold">Active</p>
            <span className="bg-[#00E100] rounded-full w-[12px] h-[12px]"></span>
          </>
        ) : (
          <>
            <p className="font-bold">Paused</p>
            <span className="bg-[#E1E100] rounded-full w-[12px] h-[12px]"></span>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleProject;
