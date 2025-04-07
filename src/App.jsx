import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Landing,
  Login,
  ProjectHome,
  Register,
  UserDashboardLayout,
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
        path: "/user-dashboard/",
        element: <UserDashboardLayout />,
        children: [{ index: true, element: <UserProjects /> }],
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
