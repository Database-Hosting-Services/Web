import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";

import { formatTime } from "../../../utils/formatting";
import CancelButton from "./ui/CancelButton";
import VerifyButton from "./ui/VerifyButton";
import { RESEND_OTP_TIMEOUT_IN_SECONDS } from "../utils/constants";

const OTPForm = ({ email, otp, setOTP, children, title }) => {
  const fetcher = useFetcher();
  const [resendTimeLeft, setResendTimeLeft] = useState(
    RESEND_OTP_TIMEOUT_IN_SECONDS,
  );

  useEffect(() => {
    if (resendTimeLeft <= 0) return;

    const interval = setInterval(() => {
      setResendTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimeLeft]);

  useEffect(() => {
    if (fetcher.data?.resendAllowedAt) {
      setOTP("");
      const resendAllowedAt = fetcher.data.resendAllowedAt;
      const newTimeLeft = Math.round((resendAllowedAt - Date.now()) / 1000);
      setResendTimeLeft(Math.max(0, newTimeLeft));
    }
  }, [fetcher.data, setOTP]);

  return (
    <>
      <h2 className="mb-2 font-medium text-[#FFFFFF] text-35px text-xl">
        {title}
      </h2>
      <p className="mb-4 font-medium text-[#8B44FF] text-lg">
        {formatTime(resendTimeLeft)}
      </p>
      {children}
      <div className="mb-5 text-[#FFFFFF] text-l">
        <fetcher.Form action="/verify-email/resend-otp" method="post">
          <input type="hidden" name="email" value={email} />
          Didn't get a code?
          <button
            type="submit"
            disabled={resendTimeLeft > 0}
            className={`text-lg mt-1.5 ml-3 ${
              resendTimeLeft > 0
                ? "text-[#aaa] hover:underline"
                : "text-[#FFFFFF] font-bold cursor-pointer"
            }`}
          >
            click to resend
          </button>
        </fetcher.Form>
      </div>

      <div className="flex justify-between mb-7 p-6">
        <CancelButton />
        <VerifyButton email={email} otpCode={otp} />
      </div>
    </>
  );
};

export default OTPForm;
