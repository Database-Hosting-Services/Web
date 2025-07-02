import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import { Landing, SqlEditor, DatabaseSchema } from "./pages";

import TableEditor from "./pages/TableEditor/TableEditor";

import authRoutes from "./features/auth/routes";
import dashboardRoutes, {
  projectHomeRoutes,
} from "./features/dashboard/routes";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Landing /> },
      ...authRoutes,
      {
        ...dashboardRoutes,
        children: [
          ...dashboardRoutes.children,
          {
            path: "project/:projectId/",
            children: [
              projectHomeRoutes,
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
