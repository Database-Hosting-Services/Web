import { useSelector, useDispatch } from "react-redux";
import {
  setActiveTab,
  selectActiveTab,
  selectShowSecondary,
} from "../../../store/sidebarSlice.jsx";
import NavButton from "./NavButton";
import {
  NAV_ITEMS,
  getNavGroups,
  renderSecondary,
} from "../../../utils/sidebarUtils.jsx";

import logo from "../../../assets/orbix.svg";

// const extractProjectIdFromUrl = (url) => {
//   const regex = /\/project\/([a-f0-9\-]{36})/;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

const Sidebar = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const showSecondary = useSelector(selectShowSecondary);

  // const url = window.location.href;
  // const projectId = extractProjectIdFromUrl(url);
  // console.log(`Project ID: ${projectId}`);

  // const editedNavItems = NAV_ITEMS.map((item) => ({
  //   ...item,
  //   path: item.path.replace(":projectId", projectId || "defaultProjectId"),
  // }));

  // console.log(`Edited NAV_ITEMS: ${JSON.stringify(editedNavItems)}`);

  const { homeNav, middleNavs, bottomNavs } = getNavGroups(NAV_ITEMS);

  return (
    <>
      <div className="top-0 left-0 z-10 flex flex-col items-center bg-primary py-5 border-tertiary border-r w-[88px] h-screen">
        {/* only logo */}
        <div className="flex justify-center items-center mb-5 w-17">
          <img src={logo} alt="logo" className="w-full h-full" />
        </div>
        <nav className="flex flex-col justify-between items-center space-y-4 w-full">
          <div className="pt-2 pb-2">
            <NavButton
              item={homeNav}
              isActive={activeTab === homeNav.id}
              onClick={() => dispatch(setActiveTab(homeNav.id))}
            />
          </div>

          <div className="mx-auto border-b-gradient w-[60px]"></div>

          <div className="flex flex-col space-y-4 pt-2 pb-2">
            {middleNavs.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={() => dispatch(setActiveTab(item.id))}
              />
            ))}
          </div>

          <div className="mx-auto border-b-gradient w-[60px]"></div>

          <div className="flex flex-col space-y-4 pt-2 pb-2">
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
        <div className="z-5 bg-primary border-tertiary border-r w-[250px] h-screen">
          {renderSecondary(activeTab)}
        </div>
      )}
    </>
  );
};

export default Sidebar;
