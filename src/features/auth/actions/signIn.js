import { redirect } from "react-router-dom";

import { publicAxios, setToken } from "../../../api";
import { errorToast, successToast } from "../../../utils/toastConfig";
import { AUTH_ENDPOINTS } from "../api/endpoints";

export default async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { data, status } = await publicAxios.post(AUTH_ENDPOINTS.signIn(), {
      email,
      password,
    });

    if (status === 200) {
      successToast("Login successfully");

      setToken(data.token);
      return redirect("/");
    } else if (status === 302) {
      successToast("Login successfully, please verify your email");
      return redirect(`/verify-email/?email=${encodeURIComponent(email)}`);
    }
  } catch (err) {
    console.error(err);

    errorToast(err?.response?.data?.message || "Login failed");

    return null;
  }
}
