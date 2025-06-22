import { successToast } from "../../../utils/toastConfig";
import { RESEND_OTP_TIMEOUT_IN_SECONDS } from "../utils/constants";

export default async function resendOTP({ request }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a successful OTP resend
      successToast("OTP resent successfully");
      resolve({
        // resendAllowedAt: new Date(Date.now() + 2 * 60 * 1000),
        resendAllowedAt: new Date(
          Date.now() + RESEND_OTP_TIMEOUT_IN_SECONDS * 1000,
        ),
      });
    }, 2000);
  });
}
