import React from "react";
import { useNavigation } from "react-router-dom";

const AuthButton = ({ children }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      className="hover:bg-gradientEnd bg-linear-to-t from-gradientEnd to-gradientStart hover:to-highlight/75 opacity-100 mt-12 p-2 rounded-3xl w-[500px] h-[50px] font-semibold text-text transition-opacity-75 duration-300 ease-in-out cursor-pointer"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Submitting..." : children}
    </button>
  );
};

export default AuthButton;
