import { Form, useNavigate, useNavigation } from "react-router-dom";
import InputGroup from "../../features/auth/components/InputGroup";

const VerifyAndResetPassword = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const email = new URLSearchParams(window.location.search).get("email") || "";
  const otpCode =
    new URLSearchParams(window.location.search).get("otpCode") || "";

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center bg-linear-to-tl from-gradientEnd via-black to-highlight px-4 min-h-screen">
      <div className="bg-[#191A30] shadow-xl p-6 border border-[#282939] rounded-3xl w-lvh h-2/7">
        {/* Form */}
        <Form
          method="post"
          className="flex flex-col justify-evenly items-center h-[600px]"
        >
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="otpCode" value={otpCode} />
          <InputGroup
            inputWidth="600px"
            label={"Create New Password"}
            name="password"
            type="password"
          />
          <InputGroup
            inputWidth="600px"
            label={"Confirm New Password"}
            name="confirm-password"
            type="password"
          />

          <div className="flex gap-1 w-3/5">
            <button
              type="button"
              className="mr-2 py-2 border border-[#282939] rounded-lg w-1/2 text-[#FFFFFF] text-lg duration-300 cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-linear-to-t from-gradientEnd to-gradientStart hover:opacity-75 ml-2 py-2 rounded-lg w-1/2 text-[#FFFFFF] text-lg transition-opacity duration-300 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Changing..." : "Change"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VerifyAndResetPassword;
