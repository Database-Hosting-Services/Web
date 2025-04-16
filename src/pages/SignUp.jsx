import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import orbixLogo from "./images/orbixLogo.png";
import Verification from "./Verification";

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

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };
  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&_!]{8,}$/;
    return passwordRegex.test(password.trim());
  };

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
          <h2 class="text-text font-bold text-2xl mb-2">Sign up for free</h2>
          <h3 class="text-text font-light text-xs mb-8">
            Let's sign up to get started
          </h3>
          <label className="block text-text mb-2 font-light text-base p-0.5 ">
            User Name
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-[500px] h-[50px]   p-6 mb-1 rounded-3xl bg-secondary text-text border 
    ${errors.username ? "border-[#FF0000]  " : "border-tertiary"} 
    focus:outline-none transition-all duration-300
    autofill:bg-secondary autofill:text-text
    [-webkit-text-fill-color: #FFFFFF]
    [box-shadow:0_0_1000px_1000px#191A30_inset]`}
          />

          {errors.username && (
            <p className="text-[#FF0000] font-light text-sm duration-200 ">
              {errors.username || " "}
            </p>
          )}

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
          {/* Sign-Up Button */}
          <button
            type="submit"
            class="w-[500px] h-[50px]   rounded-3xl mt-14 bg-linear-to-t from-gradientEnd to-gradientStart opacity-100  text-text font-semibold p-2  cursor-pointer hover:bg-gradientEnd hover:to-highlight/75 transition-opacity-75 duration-300 ease-in-out"
            onClick={handleSubmit}
          >
            Sign Up
          </button>

          {/* Sign-in link */}
          <p className="text-text text-center mt-4 text-medium">
            Already have an account?{" "}
            <a href="/signIn" className="text-gradientStart ">
              Sign In
            </a>
          </p>
        </form>
        <Toaster></Toaster>
      </div>
      {showVerification && (
        <div className="fixed inset-1  backdrop-blur-sm  bg-opacity-0 z-2 flex items-center justify-center">
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
