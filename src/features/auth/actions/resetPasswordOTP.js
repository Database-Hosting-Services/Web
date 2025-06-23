import { redirect } from "react-router-dom";

export default async function verifyAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const otpCode = formData.get("otpCode");

  return redirect(
    `/forgot-password/verify-and-reset-password?email=${encodeURIComponent(
      email,
    )}&otpCode=${otpCode}`,
  );
}
