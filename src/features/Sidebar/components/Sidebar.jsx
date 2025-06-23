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

const Sidebar = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const showSecondary = useSelector(selectShowSecondary);

  const { homeNav, middleNavs, bottomNavs } = getNavGroups(NAV_ITEMS);

  return (
    <>
      <div className="left-0 top-0 h-screen w-[88px] flex flex-col items-center py-5 bg-primary border-r border-tertiary z-10">
        {/* only logo */}
        <div className="w-17 flex items-center justify-center mb-5 ">
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
        <div className="h-screen w-[250px] bg-primary border-r border-tertiary z-5">
          {renderSecondary(activeTab)}
        </div>
      )}
    </>
  );
};

export default Sidebar;
