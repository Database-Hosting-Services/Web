import {
  SignIn,
  SignUp,
  VerifyEmail,
  ForgotPassword,
  ResetPasswordOTP,
  VerifyAndResetPassword,
} from "../../pages/auth";

import {
  signInAction,
  signUpAction,
  resendOTPAction,
  verifyEmailAction,
  forgotPasswordAction,
  verifyAndResetPasswordAction,
  resetPasswordOTPAction,
} from "./actions";

const authRoutes = [
  { path: "/signup", element: <SignUp />, action: signUpAction },
  { path: "/signin", element: <SignIn />, action: signInAction },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
    action: verifyEmailAction,
    children: [{ path: "resend-otp", action: resendOTPAction }],
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    action: forgotPasswordAction,
  },
  {
    path: "/forgot-password/reset-otp",
    element: <ResetPasswordOTP />,
    action: resetPasswordOTPAction,
  },
  {
    path: "/forgot-password/verify-and-reset-password",
    element: <VerifyAndResetPassword />,
    action: verifyAndResetPasswordAction,
  },
];

export default authRoutes;
