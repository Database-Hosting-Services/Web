import { errorToast } from "../../../utils/toastConfig";

import { publicAxios } from "../../../api";
import { AUTH_ENDPOINTS } from "../api/endpoints";
import { redirect } from "react-router-dom";

export default async function verifyAndResetPasswordAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const otpCode = formData.get("otpCode");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  if (password !== confirmPassword) {
    return errorToast("Password and confirm password do not match");
  }

  try {
    await publicAxios.post(AUTH_ENDPOINTS.resetPassword(), {
      email,
      otpCode,
      password,
    });

    redirect("/sign-in");
  } catch (err) {
    return errorToast(err?.response?.data?.message || "Password reset failed");
  }
}
