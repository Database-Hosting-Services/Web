const TopIcon = ({ icon, alt, onClick }) => {
  return (
    <img
      className="hover:scale-110 transition-transform cursor-pointer"
      onClick={onClick}
      src={icon}
      alt={alt}
    />
  );
};

export default TopIcon;
