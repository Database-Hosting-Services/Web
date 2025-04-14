import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMainMargin } from "../../store/sidebarSlice";
import Sidebar from "./Sidebar.jsx";

const DashboardLayout = () => {
  const mainMargin = useSelector(selectMainMargin);

  return (
    <div className="flex">
      <Sidebar />
      <main
        className={`${mainMargin} w-full min-h-screen bg-[#121225] transition-all duration-300`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
