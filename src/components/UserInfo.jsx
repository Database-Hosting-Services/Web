import React from "react";

const UserInfo = () => {
  return (
    <div className="flex items-center gap-[13px] bg-[#191A30] px-3 border-[#282939] border-1 rounded-2xl w-[350px] h-[75px] text-white">
      <span className="bg-white rounded-full w-[44px] h-[44px]"></span>
      <div>
        <h3 className="font-medium">Omar Sanad</h3>
        <h5 className="font-light">omarmohamedsanad3@gmail.com</h5>
      </div>
    </div>
  );
};

export default UserInfo;
