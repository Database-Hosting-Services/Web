import { redirect } from "react-router-dom";

import { publicAxios, setToken } from "../../../api";
import { errorToast, successToast } from "../../../utils/toastConfig";
import { AUTH_ENDPOINTS } from "../api/endpoints";

export default async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { data } = await publicAxios.post(AUTH_ENDPOINTS.signIn(), {
      email,
      password,
    });

    successToast("Login successfully");

    setToken(data.data.token);
    return redirect("/");
  } catch (err) {
    const status = err?.response?.status;

    if (status === 302) {
      successToast("Login successfully, please verify your email");
      return redirect(`/verify-email/?email=${encodeURIComponent(email)}`);
    }

    console.error(err);

    errorToast(err?.response?.data?.message || "Login failed");

    return null;
  }
}
