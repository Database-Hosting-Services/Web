import React, { useEffect } from "react";
import { ProjectsSearchFilter, SingleProject } from "../components";
import projects from "../data/projects";

import orbixFloatingImg from "../assets/orbixFloating.svg";
import { useDashboardContext } from "../store/DashboardContext";

const UserProjects = () => {
  const { updateProjectData } = useDashboardContext();

  useEffect(() => {
    updateProjectData(null, null);
  }, []);

  return (
    <div className="relative flex-1">
      <ProjectsSearchFilter />
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 mt-10">
        {projects.map((project) => (
          <SingleProject
            key={project._id}
            _id={project._id}
            title={project.title}
            description={project.description}
            isActive={project.isActive}
          />
        ))}
      </div>
      <span className="right-5 bottom-5 absolute">
        <img src={orbixFloatingImg} alt="" />
      </span>
    </div>
  );
};

export default UserProjects;
