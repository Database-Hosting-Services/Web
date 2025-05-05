import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import orbixLogo from "./images/orbixLogo.png";
import ResetPassword from "../features/auth/components/ResetPassword";
import InputGroup from "../features/auth/components/InputGroup";
import { isValidEmail } from "../features/auth/utils/validators";
import AuthButton from "../features/auth/components/ui/AuthButton";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setError] = useState({
    email: "",
    password: "",
  });
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const newErrors = { ...errors };

    if (value.trim() !== "") {
      newErrors[name] = "";
    }

    setError(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setError(newErrors);

    if (!isValid) return;

    toast.success("Sign in successfully !", {
      position: "top-center",
      duration: 2000,
      pauseOnHover: true,
      iconTheme: {
        primary: "#6D4DEF",
        secondary: "#FFFFFF",
        fontSize: "18px",
        marginRight: "8px",
      },
      style: {
        background: "#191A30",
        color: "#FFFFFF",
        fontSize: "14x",
        padding: "10px 16px",
        borderRadius: "11px",
        maxWidth: "fit-content",
        display: "flex",
        //gap: "8px",
        textAlign: "center",
        fontFamily: "roboto",
        wordSpacing: "1px",
        fontWeight: "250px",
      },
    });
  };

  return (
    <div className="flex h-screen">
      <div className="flex justify-center items-center bg-linear-to-tl from-gradientEnd via-black to-highlight opacity-100 w-1/2">
        <div
          className="flex justify-center items-center bg-center w-lvw h-1/2"
          style={{
            background: `url(${orbixLogo})`,
            backgroundSize: "contain",
            backgroundPosition: "left 55px center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      <div className="flex justify-center items-center bg-primary w-1/2">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-2 font-bold text-text text-2xl">Welcome back !</h2>
          <h3 className="mb-8 font-light text-text text-xs">
            Sign in to your account
          </h3>

          <InputGroup
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputGroup
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <p className="mt-1.5 font-light text-[#682EC7] text-lg text-right">
            <span
              onClick={() => setShowResetPassword(true)}
              className="font-light text-gradientStart text-base cursor-pointer"
            >
              Forget password ?
            </span>
          </p>

          {/* Sign-In Button */}
          <AuthButton>Sign In</AuthButton>

          {/* Sign-up link */}
          <p className="mt-5 text-light text-text text-center">
            Don't have an account ?
            <a href="/signUp" className="text-gradientStart">
              Sign Up
            </a>
          </p>
        </form>
        {showResetPassword && (
          <div className="z-2 fixed inset-1 flex justify-center items-center bg-opacity-0 backdrop-blur-sm">
            <ResetPassword
              email={formData.email}
              setShowResetPassword={setShowResetPassword}
            />
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
};

export default SignIn;
