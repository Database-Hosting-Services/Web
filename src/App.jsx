import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import {
  Landing,
  ProjectHome,
  DashboardLayout,
  UserProjects,
  SignIn,
  SignUp,
  Verification,
  ResetPassword,
  SqlEditor,
  DatabaseSchema,
} from "./pages";

import { loader as projectHomeLoader } from "./pages/ProjectHome";
import TableEditor from "./pages/TableEditor";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Landing /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signup/verify-email", element: <Verification /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/reset-password", element: <ResetPassword /> },

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
                  { index: true, element: <TableEditor/> },
                ],
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
