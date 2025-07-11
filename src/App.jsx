import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import ErrorBoundary, { RouterError } from "./components/ErrorBoundary";

import { Landing, SqlEditor, DatabaseSchema } from "./pages";

import TableEditor from "./pages/TableEditor/TableEditor";
import { loader as tableEditorLoader } from "./pages/TableEditor/loader";

import authRoutes from "./features/auth/routes";
import dashboardRoutes, {
  projectHomeRoutes,
} from "./features/dashboard/routes";

import { loader as schemaLoader } from "./pages/DatabaseSchema";
import { loader as projectHomeLoader } from "./pages/dashboard/ProjectLayout";
import { ProjectLayout } from "./pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <RouterError />,
    children: [
      { index: true, element: <Landing /> },
      ...authRoutes,
      {
        ...dashboardRoutes,
        children: [
          ...dashboardRoutes.children,
          {
            id: "project-home",
            path: "project/:projectId/",
            loader: projectHomeLoader,
            element: <ProjectLayout />,
            errorElement: <RouterError />,
            children: [
              projectHomeRoutes,
              {
                path: "table-editor/",
                children: [
                  {
                    index: true,
                    element: <TableEditor />,
                    loader: tableEditorLoader,
                  },
                ],
              },
              {
                path: "sql-editor/",
                children: [{ index: true, element: <SqlEditor /> }],
              },
              {
                path: "database/",
                children: [
                  {
                    index: true,
                    element: <DatabaseSchema />,
                    loader: schemaLoader,
                  },
                ],
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
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
