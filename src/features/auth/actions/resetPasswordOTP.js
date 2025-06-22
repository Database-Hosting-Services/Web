import { redirect } from "react-router-dom";
import { successToast } from "../../../utils/toastConfig";

export default async function verifyAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const otpCode = formData.get("otpCode");
  console.log("verifyAction", { email, otpCode });

  return redirect();
}
