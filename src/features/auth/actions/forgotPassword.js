import { successToast } from "../../../utils/toastConfig";

export default async function forgotPassword({ request }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a successful password reset
      successToast("Password reset link sent to your email");
      resolve({ success: true });
    }, 2000);
  });
}
