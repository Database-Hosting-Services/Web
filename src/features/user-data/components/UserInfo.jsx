import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";

import { userImg, penImg, xImg } from "../assets";

const UserInfo = () => {
  const fetcher = useFetcher();

  const [isFullControl, setIsFullControl] = useState(false);

  let userData = { userName: "...", email: "..." };

  useEffect(() => {
    fetcher.load("get-user-data/");
  }, []);

  if (fetcher.state === "loading") {
    userData = { userName: "Loading...", email: "Loading..." };
  } else {
    userData = fetcher.data || { userName: "Error", email: "Error" };
  }

  return (
    <div className="relative bg-secondary px-3 border-1 border-tertiary rounded-2xl w-[350px] h-[75px] text-white">
      {isFullControl ? (
        <div className="-top-1 -left-1 absolute bg-secondary p-5 border-1 border-tertiary rounded-2xl w-[355px] h-[360px]">
          {/* --------------- Icons ---------------*/}
          <div className="flex justify-between items-center">
            <img
              className="w-[16px] h-[16px]"
              src={xImg}
              alt="close"
              // onClick={() => setIsFullControl(false)}
            />
            <img className="w-[16px] h-[16px]" src={penImg} alt="" />
          </div>
        </div>
      ) : (
        <div
          className="flex items-center gap-[13px] w-full h-full"
          // onClick={() => {
          //   setIsFullControl(true);
          // }}
        >
          <img
            src={userImg}
            alt="user"
            className="rounded-full w-[44px] h-[44px]"
          />
          <div>
            <h3 className="font-medium">{userData.userName}</h3>
            <h5 className="font-light">{userData.email}</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
