import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveTab,
  selectActiveTab,
  selectShowSecondary,
} from "../../store/sidebarSlice";

import logo from "../../assets/orbix.svg";
import HomeIcon from "../../assets/homeicon.svg";
import TableIcon from "../../assets/oui_editor-table.svg";
import TerminalIcon from "../../assets/sqleditor.svg";
import DatabaseIcon from "../../assets/database.svg";
import Secure from "../../assets/lock.svg";
import SeachIcon from "../../assets/searchIcon.svg";
import FilterIcon from "../../assets/Filtericon.svg";

const NAV_ITEMS = [
  { id: "home", path: "/", icon: HomeIcon, alt: "Home", size: "w-10 h-10" },
  {
    id: "table",
    path: "/table-editor",
    icon: TableIcon,
    alt: "Table Editor",
    size: "w-6 h-6",
  },
  {
    id: "sql",
    path: "/sql-editor",
    icon: TerminalIcon,
    alt: "SQL Editor",
    size: "w-6 h-6",
  },
  {
    id: "database",
    path: "/database",
    icon: DatabaseIcon,
    alt: "Database",
    size: "w-10 h-10",
  },
  {
    id: "roles",
    path: "/roles",
    icon: Secure,
    alt: "Roles",
    size: "w-10 h-10",
  },
];

// Secondary sidebar content components
const TableEditorContent = () => (
  <div className="h-full">
    <h1 className="text-xl font-semibold text-center text-white mb-6 px-5 pt-4">
      Table editor
    </h1>
    <div className="border-b-gradient w-full"></div>

    <div className="space-y-3 px-5 pt-4 ">
      <div className="space-y-3 mb-11">
        <div className="bg-[#161627] rounded-md px-2 py-0.5 flex items-center border border-[#282939]">
          <span className="text-gray-300">Scheme</span>
          <span className="text-white ml-2 font-medium">public</span>
        </div>

        <button className="bg-[#161627] rounded-md px-2 py-0.5 w-full flex items-center text-white border border-[#282939]">
          <span className="mr-2 text-lg">+</span> New table
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="bg-[#161627] flex-1 mr-2 rounded-md px-2 py-0.5 flex items-center justify-between border border-[#282939]">
          <div className="flex items-center text-gray-300">
            <span className="mr-2">
              <img src={SeachIcon} alt="search logo" />
            </span>
            Search
          </div>
        </div>
        <span className="text-gray-400">
          <img src={FilterIcon} alt="Filter logo" />
        </span>
      </div>
    </div>
  </div>
);

const SqlEditorContent = () => (
  <div className="h-full">
    <h1 className="text-xl font-semibold text-center text-white mb-6 px-5 pt-4">
      SQL editor
    </h1>

    <div className="border-b-gradient w-full"></div>

    <div className="space-y-4 px-5 py-5">
      <div className="flex items-center justify-between">
        <div className="bg-[#161627] flex-1 mr-2 rounded-md px-2 py-0.5 flex items-center justify-between border border-[#282939]">
          <div className="flex items-center text-gray-300">
            <span className="mr-2">
              <img src={SeachIcon} alt="search logo" />
            </span>
            Search
          </div>
        </div>
        <span className="text-gray-400">
          <img src={FilterIcon} alt="Filter logo" />
        </span>
      </div>
    </div>

    <div className="px-4 py-2.5 flex items-center border-t border-b border-[#282939]">
      <span className="mr-2 text-white font-bold"> &gt; </span>
      <span className="text-white">Private</span>
    </div>
  </div>
);

const DatabaseContent = () => (
  <div className="h-full">
    <h1 className="text-xl text-center font-semibold text-white mb-6 px-5 pt-4">
      Database
    </h1>

    <div className="border-b-gradient w-full"></div>

    <div className="space-y-3 px-4 pt-5">
      <div className="bg-[#161627] rounded-xl px-4 py-2.5 text-gray-300 border border-[#282939]">
        scheme visualizer
      </div>

      <div className="px-1 py-2">
        <div className="text-white mb-2">Tables</div>
      </div>

      <div className="px-1 py-2">
        <div className="text-gray-400">Indexes</div>
      </div>
    </div>
  </div>
);

const RolesContent = () => (
  <div className="h-full">
    <h1 className="text-xl font-semibold text-center text-white mb-6 px-5 pt-4">
      Roles
    </h1>
    <div className="border-b-gradient w-full"></div>
  </div>
);

const Sidebar = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const showSecondary = useSelector(selectShowSecondary);

  // Group navigation items for proper divider placement
  const homeNav = NAV_ITEMS[0];
  const middleNavs = NAV_ITEMS.slice(1, 3);
  const bottomNavs = NAV_ITEMS.slice(3);

  return (
    <>
      <div className="fixed left-0 top-0 h-screen w-[88px] flex flex-col items-center py-5 bg-[#06071A] border-r border-[#282939] z-10">
        {/* only logo */}
        <div className="w-17 flex items-center justify-center mb-6">
          <img src={logo} alt="logo" className="w-full h-full" />
        </div>

        <nav className="flex flex-col space-y-4 items-center justify-between w-full">
          <div className="pt-2 pb-2">
            <NavButton
              item={homeNav}
              isActive={activeTab === homeNav.id}
              onClick={() => dispatch(setActiveTab(homeNav.id))}
            />
          </div>

          <div className="border-b-gradient w-[60px] mx-auto"></div>

          <div className="pt-2 pb-2 flex flex-col space-y-4">
            {middleNavs.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={() => dispatch(setActiveTab(item.id))}
              />
            ))}
          </div>

          <div className="border-b-gradient w-[60px] mx-auto"></div>

          <div className="pt-2 pb-2 flex flex-col space-y-4">
            {bottomNavs.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={() => dispatch(setActiveTab(item.id))}
              />
            ))}
          </div>
        </nav>
      </div>

      {showSecondary && (
        <div className="fixed left-[88px] top-0 h-screen w-[260px] bg-[#080818] border-r border-[#282939] z-5">
          {renderSecondary()}
        </div>
      )}
    </>
  );

  function renderSecondary() {
    switch (activeTab) {
      case "table":
        return <TableEditorContent />;
      case "sql":
        return <SqlEditorContent />;
      case "database":
        return <DatabaseContent />;
      case "roles":
        return <RolesContent />;
      default:
        return null;
    }
  }
};

const NavButton = ({ item, isActive, onClick }) => (
  <Link
    to={item.path}
    className={`w-[58px] h-[45px] rounded-md flex items-center justify-center ${
      isActive ? "custom-gradient" : "bg-transparent hover:bg-[#2d2d44]"
    } text-white transition-colors duration-200`}
    onClick={onClick}
  >
    <img src={item.icon} alt={item.alt} className={item.size} />
  </Link>
);

export default Sidebar;
