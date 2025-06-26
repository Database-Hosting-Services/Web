import { redirect } from "react-router-dom";
import { publicAxios, setToken } from "../../../api";
import { errorToast, successToast } from "../../../utils/toastConfig";
import { AUTH_ENDPOINTS } from "../api/endpoints";

export default async function verifyAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const otpCode = formData.get("otpCode");

  try {
    const { data } = await publicAxios.post(AUTH_ENDPOINTS.verifyAccount(), {
      email,
      code: otpCode,
    });

    successToast("Email verified successfully");

    setToken(data.data.token);

    return redirect("/");
  } catch (err) {
    console.log(err);

    errorToast(err?.response?.data?.message || "Email verification failed");

    return redirect(`/verify-email/?email=${encodeURIComponent(email)}`);
  }
}
