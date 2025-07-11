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
    <div className="relative px-15 pb-36 overflow-hidden">
      {/* <div className="top-30 -right-50 -z-1 absolute bg-[radial-gradient(circle,_#5505A4_0%,_#801AE5_42%,_#06071A_78%)] opacity-60 blur-3xl rounded-full w-[485px] h-[485px]"></div> */}
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
      {/* <div className="flex flex-row flex-wrap gap-30 mb-30">
        {StatsData.map((StatsItem) => (
          <ProjectStats
            icon={StatsItem.icon}
            text={StatsItem.text}
            key={StatsItem.text}
          />
        ))}
      </div> */}
      <SomeText />
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

const SomeText = () => {
  const data = [
    {
      heading: "Welcome to your project",
      text: "Your project has been deployed on its own instance, with its own API all set up and ready to use.",
    },
    {
      heading: "Get started by building out your database",
      text: "Start building your app by creating tables and inserting data. Our Table Editor makes Postgres as easy to use as a spreadsheet, but there's also our SQL Editor if you need something more.",
    },
  ];

  return (
    <>
      {data.map((block) => (
        <div className="mb-35" key={block.heading}>
          <h3 className="mb-2 font-medium text-2xl">{block.heading}</h3>
          <p className="mb-6 max-w-192 font-normal text-lg">{block.text}</p>
        </div>
      ))}
    </>
  );
};

export default ProjectHome;
