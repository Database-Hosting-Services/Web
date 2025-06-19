import { SignIn, SignUp, VerifyEmail, ForgotPassword } from "../../pages/auth";

import {
  signInAction,
  signUpAction,
  resendOTPAction,
  verifyAction,
  forgotPasswordAction,
} from "./actions";

const authRoutes = [
  { path: "/signup", element: <SignUp />, action: signUpAction },
  { path: "/signin", element: <SignIn />, action: signInAction },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
    action: verifyAction,
    children: [{ path: "resend-otp", action: resendOTPAction }],
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    action: forgotPasswordAction,
  },
];

export default authRoutes;
