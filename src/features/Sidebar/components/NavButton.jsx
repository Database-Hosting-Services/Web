import { Link } from "react-router-dom";

const NavButton = ({ item, isActive, onClick }) => (
  <div className="relative group">
    <Link
      to={item.path}
      className={`w-[58px] h-[45px] rounded-md flex items-center justify-center ${
        isActive ? "custom-gradient" : "bg-transparent hover:bg-[#2d2d44]"
      } text-white transition-colors duration-200`}
      onClick={onClick}
    >
      <img src={item.icon} alt={item.alt} className={item.size} />
    </Link>
    <div className="absolute left-full top-2 ml-2 px-2 py-1 bg-[#2d2d44] text-white text-sm rounded-md opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap z-20">
      {item.alt}
    </div>
  </div>
);

export default NavButton;
