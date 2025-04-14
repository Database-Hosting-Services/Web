import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import { useDashboardContext } from "../store/DashboardContext";
import ProjectStats from "../components/ProjectStats";
import StatsData from "../data/StatsData";
import projectsData from "../data/projects";
import ConnectingProject from "../components/ConnectingProject";

export const loader = async ({ params }) => {
  const { projectId } = params;
  const projectTitle = projectsData.find(
    (project) => project._id === projectId,
  ).title;
  return { projectId, projectTitle };
};

const ProjectHome = () => {
  const { projectId, projectTitle } = useLoaderData();

  const { updateProjectData, projectData } = useDashboardContext();

  useEffect(() => {
    updateProjectData(projectId, projectTitle);
  }, [projectId, projectTitle]);

  return (
    <div>
      <h2 className="mb-15 font-bold text-4xl">{projectData.title}</h2>
      <div className="gap-2 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mb-30">
        {StatsData.map((StatsItem) => (
          <ProjectStats
            icon={StatsItem.icon}
            text={StatsItem.text}
            key={StatsItem.text}
          />
        ))}
      </div>
      <ConnectingProject />
    </div>
  );
};

export default ProjectHome;
