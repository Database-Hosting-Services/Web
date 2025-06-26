import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import { Landing, SqlEditor, DatabaseSchema } from "./pages";
import {
  DashboardLayout,
  ProjectHome,
  UserProjects,
  NewProject,
} from "./pages/dashboard";

import { loader as projectHomeLoader } from "./pages/dashboard/ProjectHome";
import { loader as userProjectsLoader } from "./pages/dashboard/UserProjects";
import TableEditor from "./pages/TableEditor/TableEditor";

import { newProjectAction } from "./features/dashboard/actions";

import authRoutes from "./features/auth/routes";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Landing /> },
      ...authRoutes,
      {
        path: "/dashboard/",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <UserProjects />,
            loader: userProjectsLoader,
          },
          {
            path: "new-project/",
            element: <NewProject />,
            action: newProjectAction,
          },
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
                children: [{ index: true, element: <TableEditor /> }],
              },
              {
                path: "sql-editor/",
                children: [{ index: true, element: <SqlEditor /> }],
              },
              {
                path: "database/",
                children: [{ index: true, element: <DatabaseSchema /> }],
              },
              {
                path: "roles/",
                children: [{ index: true, element: <div>roles page</div> }],
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
