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
    <div>
      <h2 className="mb-15 font-bold text-4xl">{fetchedProjectData.title}</h2>
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
