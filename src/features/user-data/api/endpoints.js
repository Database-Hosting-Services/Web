export const USER_DATA_ENDPOINTS = {
  // Get user's Data "GET"
  getUserData: () => "/users/me",

  // update user's Data "PUT"
  updateUserData: (userId) => `/users/${userId}`,

  // update user's Password "PUT" -> [current_password, password, confirm_password]
  updateUserPassword: () => `/users/update-password`,
};
