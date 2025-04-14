import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Landing,
  Login,
  ProjectHome,
  Register,
  DashboardLayout,
  UserProjects,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Landing /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/dashboard/",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <UserProjects /> },
          {
            path: "project/:projectId/",
            children: [
              { index: true, element: <ProjectHome /> },
              {
                path: "table-editor/",
                children: [
                  { index: true, element: <div>Table Editor Page</div> },
                ],
              },
              {
                path: "sql-editor/",
                children: [
                  { index: true, element: <div>Sql Editor Page</div> },
                ],
              },
              {
                path: "database/",
                children: [
                  { index: true, element: <div>Database Schema Page</div> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
