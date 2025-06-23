export const AUTH_ENDPOINTS = {
  // When a user is logged in, and wants to update their password
  updatePassword: () => "/users/update-password", // PUT (current, new, confirm)

  // When a user forgets their password
  forgotPassword: () => "/user/forget-password", // POST (email)
  resetPassword: () => "/user/forget-password/verify", // POST (code, email, password[new])

  // After signing up, a user needs to verify their email
  verifyAccount: () => "/user/verify", // POST (code)
  // if a user doesn't receive the verification email, they can request a new one
  resendCode: () => "/user/resend-code", // POST (email)

  // Core Auth
  signIn: () => "/user/sign-in", // POST (email, password)
  signUp: () => "/user/sign-up", // POST (user data)

  // when a user wants to update their profile data
  updateUser: (id) => `/users/${id}`, // PUT (user data)
};
