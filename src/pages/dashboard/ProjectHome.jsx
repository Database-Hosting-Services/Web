import { Link, Outlet, useRouteLoaderData } from "react-router-dom";

import {
  ProjectStats,
  ConnectingProject,
} from "../../features/dashboard/components";
import orbixFloatingImg from "../../assets/orbixFloating.svg";

import StatsData from "../../features/dashboard/data/StatsData";

const ProjectHome = () => {
  const { projectData: fetchedProjectData } =
    useRouteLoaderData("project-home");

  return (
    <div className="mx-15 mb-36">
      <div className="flex justify-between items-center">
        <h2 className="mt-5 mb-15 font-bold text-4xl">
          {fetchedProjectData.title}
        </h2>
        <p className="bg-secondary px-4 py-2 border-2 border-tertiary rounded-full font-normal text-sm text-center">
          <span>
            {fetchedProjectData.status === "active" ? (
              <span className="inline-block bg-success mr-3 rounded-full w-3 h-3"></span>
            ) : (
              <span className="inline-block bg-warning mr-2 rounded-full w-3 h-3"></span>
            )}
          </span>
          <span>
            {fetchedProjectData?.status
              ? fetchedProjectData.status.charAt(0).toUpperCase() +
                fetchedProjectData.status.slice(1)
              : "Unknown"}
          </span>
        </p>
      </div>
      <div className="flex flex-row flex-wrap gap-30 mb-30">
        {StatsData.map((StatsItem) => (
          <ProjectStats
            icon={StatsItem.icon}
            text={StatsItem.text}
            key={StatsItem.text}
          />
        ))}
      </div>
      <ConnectingProject
        API_URL={fetchedProjectData.API_URL}
        API_KEY={fetchedProjectData.API_key}
      />

      <Link
        className="right-5 bottom-5 fixed hover:scale-105 transition-transform duration-300"
        to="ai/"
      >
        <img src={orbixFloatingImg} alt="" />
      </Link>

      <Outlet />
    </div>
  );
};

export default ProjectHome;
