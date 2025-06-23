import { Form, useLocation, useNavigation } from "react-router-dom";

const VerifyButton = ({ email, otpCode }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const location = useLocation();

  if (location.pathname === "/forgot-password/reset-otp") {
    return (
      <Form action="/forgot-password/reset-otp" method="post" className="w-1/2">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="otpCode" value={otpCode} />
        <button
          type="submit"
          className="bg-linear-to-t from-gradientEnd to-gradientStart hover:opacity-75 ml-2 py-2 rounded-lg w-full text-[#FFFFFF] text-lg transition-opacity duration-300 cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Proceeding..." : "Proceed"}
        </button>
      </Form>
    );
  }

  return (
    <Form action="/verify-email" method="post" className="w-1/2">
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="otpCode" value={otpCode} />
      <button
        type="submit"
        className="bg-linear-to-t from-gradientEnd to-gradientStart hover:opacity-75 ml-2 py-2 rounded-lg w-full text-[#FFFFFF] text-lg transition-opacity duration-300 cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Verifying..." : "Verify"}
      </button>
    </Form>
  );
};

export default VerifyButton;
