import { Outlet, useLoaderData, redirect } from "react-router-dom";

import { useDashboardContext } from "../../features/dashboard/store/DashboardContext";
import { useEffect } from "react";

import { privateAxios } from "../../api";
import { PROJECTS_ENDPOINTS } from "../../features/dashboard/api/endpoints";
import { errorToast } from "../../utils/toastConfig";

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

const ProjectLayout = () => {
  const {
    projectData: { _id, title },
  } = useLoaderData();

  const { updateProjectData } = useDashboardContext();

  useEffect(() => {
    updateProjectData(_id, title);
  }, [_id, title]);

  return <Outlet />;
};

export default ProjectLayout;
