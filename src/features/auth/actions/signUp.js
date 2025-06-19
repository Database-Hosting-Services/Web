import { redirect } from "react-router-dom";

import { publicAxios } from "../../../api";
import { errorToast, successToast } from "../../../utils/toastConfig";
import { AUTH_ENDPOINTS } from "../api/endpoints";

export default async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");

  return redirect(`/verify-email/?email=${encodeURIComponent(email)}`);

  try {
    await publicAxios.post(AUTH_ENDPOINTS.signUp(), {
      username,
      email,
      password,
    });

    successToast("Signup successfully");

    return redirect(`/verify-email/?email=${encodeURIComponent(email)}`);
  } catch (err) {
    console.error(err);

    errorToast(err?.response?.data?.message || "Signup failed");

    return null;
  }
}
