import { redirect } from "react-router-dom";

import { publicAxios, setToken } from "../../../api";
import { errorToast, successToast } from "../../../utils/toastConfig";
import { AUTH_ENDPOINTS } from "../api/endpoints";

export default async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  return { myAge: 21 };

  try {
    const { data } = await publicAxios.post(AUTH_ENDPOINTS.signIn(), {
      email,
      password,
    });

    successToast("Login successfully");

    setToken(data.token);

    return redirect("/");
  } catch (err) {
    console.error(err);

    errorToast("Invalid email or password");

    return null;
  }
}
