import {
  DashboardLayout,
  NewProject,
  UserProjects,
  ProjectHome,
} from "../../pages/dashboard";
import { newProjectAction } from "./actions";

import { loader as userProjectsLoader } from "../../pages/dashboard/UserProjects";
import { loader as projectHomeLoader } from "../../pages/dashboard/ProjectHome";

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
  index: true,
  element: <ProjectHome />,
  loader: projectHomeLoader,
};

export default dashboardRoutes;
