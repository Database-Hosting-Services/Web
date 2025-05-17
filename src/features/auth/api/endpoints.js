export const AUTH_ENDPOINTS = {
  // When a user is logged in, and wants to update their password
  updatePassword: () => "/accounts/password", // PUT (current, new, confirm)

  // When a user forgets their password
  forgotPassword: () => "/accounts/forgot-password", // POST (email)
  resetPassword: () => "/accounts/reset-password", // POST (token, new password)

  // After signing up, a user needs to verify their email
  verifyAccount: () => "/accounts/verify", // POST (code)
  // if a user doesn't receive the verification email, they can request a new one
  resendCode: () => "/accounts/resend-code", // POST (email)

  // Core Auth
  signIn: () => "/accounts/signin", // POST (email, password)
  signUp: () => "/accounts/signup", // POST (user data)

  // when a user wants to update their profile data
  updateUser: (id) => `/accounts/${id}`, // PUT (user data)
};
