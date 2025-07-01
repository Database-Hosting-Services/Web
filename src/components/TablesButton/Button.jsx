import React from "react";
import Group from "../../assets/Group.svg";
import Vector from "../../assets/Vector.svg";
import Edit from "../../assets/Edit.svg";
import Delete from "../../assets/Delete.svg";

const TableButton = ({ onView, onEdit, onDuplicate, onDelete }) => {
  return (
    <div className="absolute right-0 mt-2 w-52 bg-[#191A30] rounded-xl  border border-[#282939] z-10">
      <ul className="text-sm font-normal text-[#FFFFFF] p-3 space-y-1 ">
        <li
          className="flex items-center gap-2 px-3 py-2  cursor-pointer"
          onClick={onView}
        >
          <img src={Group} alt="View" className="pr-2  " />
          View in table editor
        </li>
        <li
          className="flex items-center gap-2 px-3 py-2 cursor-pointer"
          onClick={onEdit}
        >
          <img src={Edit} alt="Edit" className="pr-2" />
          Edit table
        </li>
        <li
          className="flex items-center gap-2 px-3 py-2  cursor-pointer"
          onClick={onDuplicate}
        >
          <img src={Vector} alt="Duplicate" className="pr-2" />
          Duplicate table
        </li>
        <li
          className="flex items-center gap-2 px-3 py-2  cursor-pointer"
          onClick={onDelete}
        >
          <img src={Delete} alt="Delete" className="pr-2" />
          Delet table
        </li>
      </ul>
    </div>
  );
};

export default TableButton;
