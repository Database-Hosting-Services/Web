import { useNavigate } from "react-router-dom";

const CancelButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="mr-2 py-2 border border-[#282939] rounded-lg w-1/2 text-[#FFFFFF] text-lg duration-300 cursor-pointer"
      onClick={() => navigate("/signup")}
    >
      Cancel
    </button>
  );
};

export default CancelButton;
