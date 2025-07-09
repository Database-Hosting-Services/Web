import { Navbar } from "../components";
import { Outlet, useParams } from "react-router-dom";
import DashboardContextProvider from "../store/DashboardContext";
import Sidebar from "../features/Sidebar/components/Sidebar.jsx";
import { ProjectProvider } from "../store/ProjectContext";

const DashboardLayout = () => {
  // Get project ID from URL parameters if available
  const { projectId } = useParams();

  return (
    <DashboardContextProvider>
      <ProjectProvider initialProjectId={projectId || 1}>
        <div className="grid grid-cols-[auto_1fr]  bg-[#06071A] text-white">
          <div className="flex">
            <Sidebar />
          </div>
          <div>
            <Navbar />
            <div className="flex flex-col border-gray-800 border-l-1 min-h-[calc(100vh-117px)]">
              <Outlet />
            </div>
          </div>
        </div>
      </ProjectProvider>
    </DashboardContextProvider>
  );
};

export default DashboardLayout;
