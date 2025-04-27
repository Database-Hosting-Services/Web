import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import orbixLogo from "./images/orbixLogo.png";
import Verification from "./Verification";

import {
  isValidEmail,
  isValidPassword,
} from "../features/auth/utils/validators";

import InputGroup from "../features/auth/components/InputGroup";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setError] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showVerification, setShowVerification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value.trim() !== "") {
      setError((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    let newErrors = { ...errors };
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email ";
      isValid = false;
    }

    if (!formData.password) {
      isValid = false;
      newErrors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      isValid = false;
      newErrors.password =
        "Password must be at least 8 characters [A-Za-z], [0-9] and [@/#$%^&!_].";
    }

    setError(newErrors);

    if (!isValid) return;

    console.log(formData);
    toast.success("We've already sent to your email ", {
      position: "top-center",
      duration: 2000,
      pauseOnHover: true,
      icon: null,
      style: {
        background: "#191A30",
        color: "#FFFFFF",
        fontSize: "14x",
        padding: "13 px",
        borderRadius: "11px",
        width: "1100px",
        margin: "13px",
        textAlign: "center",
        fontFamily: "roboto",
        wordSpacing: "1px",
        fontWeight: "250px",
      },
    });
    setTimeout(() => {
      setShowVerification(true);
    }, 2000);
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
        <form>
          <h2 className="mb-2 font-bold text-text text-2xl">
            Sign up for free
          </h2>
          <h3 className="mb-8 font-light text-text text-xs">
            Let's sign up to get started
          </h3>
          <InputGroup
            label="User Name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          <InputGroup
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputGroup
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />{" "}
          {/* Sign-Up Button */}
          <button
            type="submit"
            className="hover:bg-gradientEnd bg-linear-to-t from-gradientEnd to-gradientStart hover:to-highlight/75 opacity-100 mt-14 p-2 rounded-3xl w-[500px] h-[50px] font-semibold text-text transition-opacity-75 duration-300 ease-in-out cursor-pointer"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          {/* Sign-in link */}
          <p className="mt-4 text-medium text-text text-center">
            Already have an account?{" "}
            <a href="/signIn" className="text-gradientStart">
              Sign In
            </a>
          </p>
        </form>
        <Toaster></Toaster>
      </div>
      {showVerification && (
        <div className="z-2 fixed inset-1 flex justify-center items-center bg-opacity-0 backdrop-blur-sm">
          <Verification
            email={formData.email}
            setShowVerification={setShowVerification}
          />
        </div>
      )}
    </div>
  );
};

export default SignUp;
