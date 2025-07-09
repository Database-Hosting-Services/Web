import {
  DashboardLayout,
  NewProject,
  UserProjects,
  ProjectHome,
} from "../../pages/dashboard";
import { newProjectAction } from "./actions";

import { loader as userProjectsLoader } from "../../pages/dashboard/UserProjects";
import { Layout } from "../../pages/AI-Agent";
// import { loader as projectHomeLoader } from "../../pages/dashboard/ProjectHome";

import { aiRoutes } from "../AI-Agent/routes";

const dashboardRoutes = {
  path: "/dashboard/",
  element: <DashboardLayout />,
  children: [
    {
      path: "",
      element: <UserProjects />,
      loader: userProjectsLoader,
      children: [
        {
          path: "new-project/",
          element: <NewProject />,
          action: newProjectAction,
        },
        {
          path: "edit-project/:projectId",
          element: <NewProject />,
          action: newProjectAction,
        },
        {
          path: "delete-project/:projectId",
          element: <div>Delete Project Modal</div>,
          action: () => {},
        },
      ],
    },
  ],
};

export const projectHomeRoutes = {
  path: "",
  element: <ProjectHome />,
  // loader: projectHomeLoader,
  children: [{ path: "ai/", element: <Layout />, children: [...aiRoutes] }],
};

export default dashboardRoutes;
