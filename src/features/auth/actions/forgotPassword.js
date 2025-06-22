import { redirect } from "react-router-dom";
import { publicAxios } from "../../../api";
import { errorToast, successToast } from "../../../utils/toastConfig";
import { AUTH_ENDPOINTS } from "../api/endpoints";

export default async function forgotPassword({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");

  try {
    // await publicAxios.post(AUTH_ENDPOINTS.forgotPassword(), { email });

    successToast("Password reset link sent to your email");

    return redirect(
      "/forgot-password/reset-otp" + `?email=${encodeURIComponent(email)}`,
    );
  } catch (err) {
    return errorToast(
      err?.response?.data?.message || "Failed to send password reset link",
    );
  }
}
