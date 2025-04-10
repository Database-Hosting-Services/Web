import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Landing,
  ProjectHome,
  UserDashboardLayout,
  UserProjects,
  SignIn,
  SignUp,
  Verification,
  ResetPassword,
} from "./pages";

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
