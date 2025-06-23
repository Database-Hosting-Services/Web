import HomeIcon from "../assets/homeicon.svg";
import TableIcon from "../assets/oui_editor-table.svg";
import TerminalIcon from "../assets/sqleditor.svg";
import DatabaseIcon from "../assets/databaseIconSidebar.svg";
import Secure from "../assets/lock.svg";
import TableEditorContent from "../features/Sidebar/components/TableEditorContent";
import SqlEditorContent from "../features/Sidebar/components/SqlEditorContent";
import DatabaseContent from "../features/Sidebar/components/DatabaseContent";
import RolesContent from "../features/Sidebar/components/RolesContent";

export const NAV_ITEMS = [
  {
    id: "home",
    path: "/dashboard",
    icon: HomeIcon,
    alt: "Home",
    size: "w-10 h-10",
  },
  {
    id: "table",
    path: "/dashboard/project/:projectId/table-editor",
    icon: TableIcon,
    alt: "Table Editor",
    size: "w-6 h-6",
  },
  {
    id: "sql",
    path: "/dashboard/project/:projectId/sql-editor",
    icon: TerminalIcon,
    alt: "SQL Editor",
    size: "w-6 h-6",
  },
  {
    id: "database",
    path: "/dashboard/project/:projectId/database",
    icon: DatabaseIcon,
    alt: "Database",
    size: "w-10 h-10",
  },
  {
    id: "roles",
    path: "/dashboard/project/:projectId/roles",
    icon: Secure,
    alt: "Roles",
    size: "w-10 h-10",
  },
];

// Helper function to group navigation items
export const getNavGroups = (items) => {
  return {
    homeNav: items[0],
    middleNavs: items.slice(1, 3),
    bottomNavs: items.slice(3),
  };
};

// Renders the appropriate secondary sidebar content based on active tab
export const renderSecondary = (activeTab) => {
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
};
