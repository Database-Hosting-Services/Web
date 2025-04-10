import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import orbixLogo from "./images/orbixLogo.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <div class="w-1/2 bg-primary flex justify-center items-center">
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
            class="w-xl  p-2 mb-4 rounded-3xl bg-secondary text-text  border-solid border-tertiary focus:outline-none focus:ring-[#282939]   focus:none  autofill:bg-secondary autofill:text-text
            [-webkit-text-fill-color: #FFFFFF] 
            [box-shadow:0_0_1000px_1000px#191A30_inset] "
          />

          {/* Email */}
          <label class="block text-text mb-2 p-0.5 font-light text-base">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            class="w-full    p-2 mb-4 rounded-3xl bg-secondary text-text  border-solid border-tertiary focus:outline-none focus:ring-[#282939]   focus:none  autofill:bg-secondary autofill:text-text
            [-webkit-text-fill-color: #FFFFFF] 
            [box-shadow:0_0_1000px_1000px#191A30_inset] "
          ></input>

          {/* Password */}
          <label class="block text-text mb-2 p-0.5 font-light text-base ">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            class="w-full p-2 mb-4 rounded-3xl bg-secondary text-text border-solid border-tertiary focus:outline-none  focus:none"
          />

          {/* Sign-Up Button */}
          <button
            type="submit"
            class="w-full rounded-3xl mt-14 p-0.5 bg-linear-to-t from-gradientEnd to-gradientStart opacity-100  text-text font-semibold p-2  cursor-pointer hover:bg-gradientEnd hover:to-highlight/75 transition-opacity-75 duration-300 ease-in-out"
            z-ind
            onClick={handleSubmit}
          >
            Sign Up
          </button>

          {/* Sign-in link */}
          <p className="text-text text-center mt-4 text-medium">
            Already have an account?{" "}
            <a href="/signIn" className="text-gradientStart ">
              Sign in
            </a>
          </p>
        </form>
        <Toaster></Toaster>
      </div>
    </div>
  );
};
export default SignUp;
