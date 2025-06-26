import React from "react";

const ProjectStats = ({ icon, text }) => {
  return (
    <div className="bg-[#191A30] m-1 my-5 p-7 rounded-2xl w-[335px] h-[335px]">
      <div className="flex items-end gap-4">
        <img src={icon} alt={text} />
        <h3 className="font-medium text-xl">{text}</h3>
      </div>
    </div>
  );
};

export default ProjectStats;
