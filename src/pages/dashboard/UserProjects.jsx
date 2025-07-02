import {
  ProjectsSearchFilter,
  SingleProject,
} from "../../features/dashboard/components";

import orbixFloatingImg from "../../assets/orbixFloating.svg";
import { privateAxios } from "../../api";
import { PROJECTS_ENDPOINTS } from "../../features/dashboard/api/endpoints";
import { errorToast } from "../../utils/toastConfig";
import { Outlet, redirect, useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await privateAxios.get(PROJECTS_ENDPOINTS.getProjects());

    return {
      projects: data.data.map((project) => ({
        _id: project.oid,
        title: project.name,
        description: project.description,
        isActive: project.status === "active",
      })),
    };
  } catch (err) {
    errorToast(err?.response?.data?.message || "Failed to fetch projects");
    return redirect("/signin");
  }
};

const UserProjects = () => {
  const { projects } = useLoaderData();

  return (
    <div className="relative flex flex-col flex-1">
      <Outlet />
      <ProjectsSearchFilter />
      {projects?.length > 0 ? (
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
      ) : (
        <div className="flex flex-col flex-1 justify-center items-center h-full">
          <p className="">No projects found</p>
        </div>
      )}

      <span className="right-5 bottom-5 absolute">
        <img src={orbixFloatingImg} alt="" />
      </span>
    </div>
  );
};

export default UserProjects;
