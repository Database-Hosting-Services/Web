import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const navigate = useNavigate();
  return (
    <div className="z-50 fixed inset-0">
      <div
        className="absolute inset-0 backdrop-brightness-30"
        onClick={() => {
          navigate("/dashboard");
        }}
      ></div>

      {/* Popup content */}
      <div className="top-1/2 left-1/2 relative bg-[#06071A] shadow-xl p-6 rounded-lg max-w-[815px] h-[629px] -translate-x-1/2 -translate-y-1/2">
        <h2 className="mb-4 font-semibold text-xl">New Project</h2>
        {/* Add your form content here */}
      </div>
    </div>
  );
};

export default NewProject;
