import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import orbixLogo from "./images/orbixLogo.png";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setError] = useState({
    email: "",
    password: "",
  });

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
      duration: 3000,
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
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-linear-to-tl from-gradientEnd via-black to-highlight opacity-100 flex items-center justify-center">
        <div
          className="flex items-center justify-center h-1/2 w-lvw bg-center"
          style={{
            background: `url(${orbixLogo})`,
            backgroundSize: "contain",
            backgroundPosition: "left 55px center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      <div className="w-1/2 bg-primary flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <h2 className="text-text font-bold text-2xl mb-2">Welcome back !</h2>
          <h3 className="text-text font-light text-xs mb-8">
            Sign in to your account
          </h3>

          {/* Email */}
          <label className="block text-text mt-6 mb-2 p-0.5 font-light text-base">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-[500px] h-[50px] p-6 mb-1 rounded-3xl bg-secondary text-text border 
              ${errors.email ? "border-[#FF0000]" : "border-tertiary"} 
              focus:outline-none transition-all duration-300 autofill:text-text 
              [box-shadow:0_0_1000px_1000px#191A30_inset]`}
          />
          <p className="text-[#FF0000] font-light text-sm">
            {errors.email || " "}
          </p>

          {/* Password */}
          <label className="block text-text mt-6 mb-2 p-0.5 font-light text-base">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-[500px] h-[50px] p-6 mb-1 rounded-3xl bg-secondary text-text border 
              ${errors.password ? "border-[#FF0000]" : "border-tertiary"} 
              focus:outline-none transition-all duration-300`}
          />
          <p className="text-[#FF0000] font-light text-sm">
            {errors.password || " "}
          </p>

          <p className="text-[#682EC7] font-light text-sm text-right">
            <a
              href="/reset-password"
              className="text-gradientStart font-light text-base"
            >
              Forget password ?
            </a>
          </p>

          {/* Sign-In Button */}
          <button
            type="submit"
            className="w-[500px] h-[50px] rounded-3xl mt-14 bg-linear-to-t from-gradientEnd to-gradientStart opacity-100 text-text font-semibold p-2 cursor-pointer hover:bg-gradientEnd hover:to-highlight/75 transition-opacity-75 duration-300 ease-in-out"
          >
            Sign In
          </button>

          {/* Sign-up link */}
          <p className="text-text text-center mt-4 text-light">
            Don't have an account ?{" "}
            <a href="/signUp" className="text-gradientStart">
              Sign Up
            </a>
          </p>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default SignIn;
