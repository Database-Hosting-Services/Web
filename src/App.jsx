import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import {
  Landing,
  Login,
  ProjectHome,
  Register,
  UserDashboardLayout,
  UserProjects,
  DashboardLayout,
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
        children: [
          { index: true, element: <UserDashboardLayout /> },
          { path: "projects", element: <UserProjects /> },
        ],
      },
      {
        path: "/dashboard/project/:projectId/",
        element: <DashboardLayout />,
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
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
