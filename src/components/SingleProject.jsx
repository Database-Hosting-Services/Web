import React from "react";

const SingleProject = ({ _id, title, description, isActive }) => {
  console.log(_id);

  return (
    <div className="grid grid-cols-1 grid-rows-2 bg-secondary p-3 rounded-2xl max-w-[345px] h-[180px]">
      <div className="flex justify-between items-center p-4 border-b-gradient">
        <div className="">
          <h3 className="font-bold">{title}</h3>
          <p className="font-light">{description}</p>
        </div>
        <span>&gt;</span>
      </div>
      <div className="flex justify-between items-end p-4">
        {isActive ? (
          <>
            <p className="font-bold">Active</p>
            <span className="bg-green-500 rounded-full w-[12px] h-[12px]"></span>
          </>
        ) : (
          <>
            <p className="font-bold">InActive</p>
            <span className="bg-orange-500 rounded-full w-[12px] h-[12px]"></span>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleProject;
