import { redirect } from "react-router-dom";
import { publicAxios } from "../../../api";
import { errorToast, successToast } from "../../../utils/toastConfig";
import { AUTH_ENDPOINTS } from "../api/endpoints";

export default async function resendOTP({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");

  try {
    await publicAxios.post(AUTH_ENDPOINTS.resendCode(), {
      email,
    });

    return successToast("OTP resent successfully");
  } catch (err) {
    errorToast(err?.response?.data?.message || "Failed to resend OTP");

    return redirect("/signin");
  }
}
