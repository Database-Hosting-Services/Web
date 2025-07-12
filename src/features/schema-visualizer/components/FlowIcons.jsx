import {
  isUniqueIcon,
  isPrimaryKeyIcon,
  isNullableIcon,
  isNotNullIcon,
} from "../assets";

const icons = [
  { icon: isPrimaryKeyIcon, label: "Primary Key" },
  { icon: isUniqueIcon, label: "Unique" },
  { icon: isNullableIcon, label: "Nullable" },
  { icon: isNotNullIcon, label: "Not Null" },
];

const FlowIcons = () => {
  return icons.map(({ icon, label }) => (
    <div
      key={label}
      className="flex items-center gap-2 bg-tertiary m-0 p-2 rounded-lg"
    >
      <img src={icon} alt={label} />
      <span className="text-white text-sm">{label}</span>
    </div>
  ));
};

export default FlowIcons;
