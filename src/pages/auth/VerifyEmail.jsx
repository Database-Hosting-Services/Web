import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import verificationLogo from "../../features/auth/assets/VerificationLogo.png";
import OTPForm from "../../features/auth/components/OTPForm";
import CustomOTPInput from "../../features/auth/components/CustomOTPInput";

function VerifyEmail() {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = decodeURIComponent(searchParams.get("email") || "");

  useEffect(() => {
    if (!email) navigate("/signUp");
  }, [email, navigate]);

  return (
    <div className="flex justify-center items-center bg-linear-to-tl from-gradientEnd via-black to-highlight px-4 min-h-screen">
      <div className="bg-[#191A30] shadow-xl p-6 border border-[#282939] rounded-3xl w-lvh h-2/7 text-center">
        <div className="flex justify-center items-center mb-10">
          <img
            className="-ml-10"
            src={verificationLogo}
            alt="Verification Logo"
          />
        </div>

        <OTPForm
          email={email}
          otp={otp}
          setOTP={setOtp}
          title={"Enter Verification code"}
        >
          <CustomOTPInput otp={otp} setOtp={setOtp} />
        </OTPForm>
      </div>
    </div>
  );
}

export default VerifyEmail;
