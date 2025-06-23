import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Landing,
  ProjectHome,
  UserDashboardLayout,
  UserProjects,
} from "./pages";

import authRoutes from "./features/auth/routes";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Landing /> },
      ...authRoutes,
      {
        path: "/user-dashboard/",
        children: [
          { index: true, element: <UserDashboardLayout /> },
          { path: "projects", element: <UserProjects /> },
        ],
      },
      {
        path: "/dashboard/project/:projectId/",
        children: [
          { index: true, element: <ProjectHome /> },
          {
            path: "table-editor/",
            children: [{ index: true, element: <></> }],
          },
          { path: "sql-editor/", children: [{ index: true, element: <></> }] },
          { path: "database/", children: [{ index: true, element: <></> }] },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
