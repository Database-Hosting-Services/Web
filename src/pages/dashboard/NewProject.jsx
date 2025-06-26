import { useState } from "react";
import { useNavigate, useSubmit } from "react-router-dom";

const NewProject = () => {
  const submit = useSubmit();

  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDescription);
    submit(formData, { method: "post", action: "/dashboard/new-project" });
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="z-50 fixed inset-0">
      <div
        className="absolute inset-0 backdrop-brightness-50"
        onClick={() => {
          navigate("/dashboard");
        }}
      ></div>

      {/* Popup content */}
      <div className="top-1/2 left-1/2 relative bg-[#06071A] shadow-xl px-9 rounded-xl max-w-[815px] h-[629px] -translate-x-1/2 -translate-y-1/2">
        <ProjectText />
        <ProjectDataInput
          label={"Project Name"}
          data={projectName}
          setData={setProjectName}
          placeholder={"Enter project name"}
        />
        <ProjectDataInput
          label={"Project Description"}
          data={projectDescription}
          setData={setProjectDescription}
          placeholder={"Enter project description"}
        />
        <ProjectButtons onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default NewProject;

const ProjectText = () => {
  return (
    <div className="flex flex-col justify-center items-start py-4 border-b-gradient h-[178px]">
      <h3 className="font-medium text-2xl">Create a new project</h3>
      <br />
      <p className="font-normal text-xl">
        Your project will have its own dedicated instance and full Postgres
        database.
        <br />
        An API will be set up so you can easily interact with your new database.
      </p>
    </div>
  );
};

const ProjectDataInput = ({ data, setData, label, placeholder }) => {
  return (
    <div className="flex justify-between items-start pt-15 border-b-gradient h-[178px]">
      <label
        htmlFor="project-name"
        className="pt-2.5 font-medium text-xl text-nowrap"
      >
        {label}
      </label>
      <input
        id="project-name"
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder={placeholder || "Enter data"}
        className="bg-[#191A30] [box-shadow:0_0_1000px_1000px#191A30_inset] p-5 border-[#282939] rounded-2xl focus:outline-none w-112 h-12 font-light text-white autofill:text-text placeholder:text-white text-sm placeholder:text-base"
      />
    </div>
  );
};

const ProjectButtons = ({ onSubmit, onCancel }) => {
  return (
    <div className="flex justify-end items-center gap-4 pt-6">
      <button
        onClick={onCancel}
        className="bg-[#191A30] [box-shadow:0_0_1000px_1000px#191A30_inset] px-6 py-2 rounded-2xl font-medium text-white cursor-pointer"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        className="bg-custom-linear-gradient px-6 py-2 rounded-2xl font-medium text-white cursor-pointer"
      >
        Create New Project
      </button>
    </div>
  );
};
