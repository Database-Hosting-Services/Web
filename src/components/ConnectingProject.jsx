import React from "react";

const ConnectingProject = () => {
  return (
    <div className="gap-4 grid grid-cols-2 ">
      <div>
        <h3 className="mb-2 font-semibold text-2xl">
          Connecting to your new project
        </h3>
        <p className="w-101 font-normal text-lg">
          Interact with your database with your API keys. More information about
          your project's keys can be found in your project's API settings.
        </p>
      </div>

      {/* Connection URL Strings */}
      <div className="bg-secondary rounded-2xl max-w-[666px]">
        {/* project API */}
        <div className="p-7 border-tertiary border-b-2">
          <h4 className="mb-3 font-semibold text-xl">Project API</h4>
          <p className="font-light">
            Your API is secured behind an API gateway which requires an API Key
            for every request.
          </p>
        </div>
        {/* Project URL */}
        <div className="flex justify-between items-start p-7 border-tertiary border-b-2">
          <h4 className="mb-3 font-normal text-xl">Project URL</h4>
          <div className="flex flex-col align-center">
            <input
              type="text"
              readOnly
              value="the link"
              className="mb-3 p-3 border-2 border-tertiary rounded-2xl outline-none w-[387px] font-normal text-sm"
            />
            <p className="max-w-99 font-normal text-sm">
              A RESTful endpoint for querying and managing your database.
            </p>
          </div>
        </div>
        {/* API Key */}
        <div className="flex justify-between items-start p-7">
          <h4 className="mb-3 font-normal text-xl">API Key</h4>
          <div className="flex flex-col align-center">
            <input
              type="text"
              readOnly
              value="the link"
              className="mb-3 p-3 border-2 border-tertiary rounded-2xl outline-none w-[387px] font-normal text-sm"
            />
            <p className="max-w-99 font-normal text-sm">
              This key is safe to use in a browser if you have enabled Row Level
              Security (RLS) for your tables and configured policies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectingProject;
