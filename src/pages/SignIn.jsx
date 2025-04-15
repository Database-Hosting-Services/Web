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

  const [attempt, setAttempt] = useState(false);

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
    setAttempt(true);
    const newErrors = {};
    let isValid = true;

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
    }

    setError(newErrors);

    if (!isValid) return;
  };

  return (
    <div class="flex h-screen">
      <div
        class="w-1/2 bg-linear-to-tl from-gradientEnd via-black to-highlight opacity-100
  flex items-center justify-center"
      >
        <div
          class="  flex items-center justify-center  h-1/2 w-lvw  bg-center"
          style={{
            background: `url(${orbixLogo})`,
            backgroundSize: "contain",
            backgroundPosition: "left 55px center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
      <div class="w-1/2  bg-primary flex justify-center items-center">
        <form>
          <h2 class="text-text font-bold text-2xl mb-2">Welcome back !</h2>
          <h3 class="text-text font-light text-xs mb-8">
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
            className={`w-[500px] h-[50px]   p-6 mb-1 rounded-3xl bg-secondary text-text border 
    ${errors.email ? "border-[#FF0000]" : "border-tertiary "} 
    focus:outline-none transition-all duration-300  autofill:text-text 
    [box-shadow:0_0_1000px_1000px#191A30_inset]`}
          />
          <p className="text-[#FF0000] font-light text-sm  ">
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
            className={`w-[500px] h-[50px]  p-6 mb-1 rounded-3xl bg-secondary text-text border 
    ${errors.password ? "border-[#FF0000]" : "border-tertiary"} 
    focus:outline-none transition-all duration-300`}
          />
          <p className="text-[#FF0000] font-light text-sm ">
            {errors.password || " "}
          </p>
          {attempt && (errors.password || errors.email) && (
            <p className="text-[#682EC7] font-light text-sm  text-right">
              <a
                href="/reset-password"
                className="text-gradientStart  font-light text-base"
              >
                Forget password ?
              </a>
            </p>
          )}

          {/* Sign-Up Button */}
          <button
            type="submit"
            class="w-[500px] h-[50px]   rounded-3xl mt-14 bg-linear-to-t from-gradientEnd to-gradientStart opacity-100  text-text font-semibold p-2  cursor-pointer hover:bg-gradientEnd hover:to-highlight/75 transition-opacity-75 duration-300 ease-in-out"
            onClick={handleSubmit}
          >
            Sign In
          </button>

          {/* Sign-in link */}
          <p className="text-text text-center mt-4 text-medium">
            Don't have an account ?{" "}
            <a href="/signUp" className="text-gradientStart ">
              Sign Up
            </a>
          </p>
        </form>
        <Toaster></Toaster>
      </div>
    </div>
  );
};

export default SignIn;
