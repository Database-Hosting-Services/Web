import { useEffect } from "react";
import { redirect, useLoaderData } from "react-router-dom";

import { privateAxios } from "../../api";
import { PROJECTS_ENDPOINTS } from "../../features/dashboard/api/endpoints";
import { errorToast } from "../../utils/toastConfig";

import {
  ProjectStats,
  ConnectingProject,
} from "../../features/dashboard/components";

import StatsData from "../../features/dashboard/data/StatsData";

import { useDashboardContext } from "../../features/dashboard/store/DashboardContext";

export const loader = async ({ params }) => {
  const { projectId } = params;

  try {
    const {
      data: { data },
    } = await privateAxios.get(PROJECTS_ENDPOINTS.getProject(projectId));

    console.log(data);

    return { projectData: { ...data, _id: data.oid, title: data.name } };
  } catch (err) {
    errorToast(err?.response?.data?.message || "Failed to fetch project data");
    return redirect("/dashboard");
  }
};

const ProjectHome = () => {
  const { projectData: fetchedProjectData } = useLoaderData();

  const { updateProjectData } = useDashboardContext();

  useEffect(() => {
    updateProjectData(fetchedProjectData._id, fetchedProjectData.title);
  }, [fetchedProjectData]);

  return (
    <div className="mx-15 mb-10">
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
      <ConnectingProject />
    </div>
  );
};

export default ProjectHome;
