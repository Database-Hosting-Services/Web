import React from "react";
import { ProjectsSearchFilter, SingleProject } from "../components";
import projects from "../data/projects";

const UserProjects = () => {
  return (
    <div>
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
    </div>
  );
};

export default UserProjects;
