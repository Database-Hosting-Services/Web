import { useSelector, useDispatch } from "react-redux";
import {
  setActiveTab,
  selectActiveTab,
  selectShowSecondary,
} from "../../store/sidebarSlice";
import NavButton from "./NavButton";
import TableEditorContent from "./TableEditorContent";
import SqlEditorContent from "./SqlEditorContent";
import DatabaseContent from "./DatabaseContent";
import RolesContent from "./RolesContent";

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
      <div className="fixed left-0 top-0 h-screen w-[88px] flex flex-col items-center py-5 bg-primary border-r border-tertiary z-10">
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
        <div className="fixed left-[88px] top-0 h-screen w-[250px] bg-primary border-r border-tertiary z-5">
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

export default Sidebar;
