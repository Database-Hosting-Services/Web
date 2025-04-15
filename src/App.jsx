import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import {
  Landing,
  Login,
  ProjectHome,
  Register,
  DashboardLayout,
  UserProjects,
} from "./pages";

import { loader as projectHomeLoader } from "./pages/ProjectHome";

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
              {
                index: true,
                element: <ProjectHome />,
                loader: projectHomeLoader,
              },
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
              {
                path: "roles/",
                children: [
                  { index: true, element: <div>roles page</div> },
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
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
