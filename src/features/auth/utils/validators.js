export const validateEmail = (email) => {
  const trimmed = email.trim();
  if (!trimmed) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Use a valid email (e.g., user@example.com)";
  }
  return null;
};

export const validatePassword = (password) => {
  const trimmed = password.trim();
  if (!trimmed) return "Password is required";
  if (trimmed.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(trimmed)) return "Include at least one uppercase letter";
  if (!/[a-z]/.test(trimmed)) return "Include at least one lowercase letter";
  if (!/[0-9]/.test(trimmed)) return "Include at least one number";
  if (!/[@#$%^&!]/.test(trimmed)) {
    return "Add a special character (@, #, $, etc.)";
  }
  return null;
};

export const validateUsername = (username) => {
  const trimmed = username.trim();
  if (!trimmed) return "Username is required";
  if (trimmed.length < 3) return "Username must be at least 3 characters";
  if (trimmed.length > 20) return "Username must be less than 20 characters";
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return "Use only letters, numbers, and underscores";
  }
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  const trimmedPassword = password.trim();
  const trimmedConfirmPassword = confirmPassword.trim();
  if (!trimmedConfirmPassword) return "Confirm Password is required";
  if (trimmedPassword !== trimmedConfirmPassword)
    return "Passwords do not match";
  return null;
};
