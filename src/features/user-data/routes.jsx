import { getUserDataLoader } from "./loaders";

const userDataRoutes = [
  { path: "get-user-data/", loader: getUserDataLoader },
  { path: "update-user-data/", action: () => {} },
  { path: "update-user-password/", action: () => {} },
];

export default userDataRoutes;
