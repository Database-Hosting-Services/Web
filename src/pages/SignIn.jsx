import React, { useState } from "react";
import orbixLogo from "./images/orbixLogo.png";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div class="flex h-screen">
      <div
        class="w-1/2 bg-linear-to-tl from-gradientEnd via-black to-highlight opacity-98
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
        {/* <h1 class="size-18 rounded-full bg-radial from-radialMiddle from-60% to-radial-star"></h1> */}
      </div>
      <div class="w-1/2 bg-primary flex justify-center items-center">
        <form>
          <h2 class="text-text font-bold text-2xl mb-2">Welcome back !</h2>
          <h3 class="text-text font-light text-xs mb-8">
            Sign in to your account
          </h3>

          {/* Email */}
          <label class="block text-text mb-2 p-0.5 font-light text-base">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            class="w-xl    p-2 mb-4 rounded-3xl bg-secondary text-text  border-solid border-tertiary focus:outline-none focus:ring-[#282939]   focus:none  autofill:bg-secondary autofill:text-text
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
          <p>
            <a
              href="/reset-password"
              className="text-gradientStart flex items-end pl-118 font-light text-sm cursor-pointer "
            >
              {" "}
              Forget password ?
            </a>
          </p>

          {/* Sign-Up Button */}
          <button
            type="submit"
            class="w-full rounded-3xl mt-14 p-0.5 bg-linear-to-t from-gradientEnd to-gradientStart opacity-100  text-text font-semibold p-2  cursor-pointer hover:bg-gradientEnd hover:to-highlight/75 transition-opacity-75 duration-300 ease-in-out"
            z-ind
            onClick={handleSubmit}
          >
            Sign In
          </button>

          {/* Sign-in link */}
          <p className="text-text text-center mt-4 text-medium">
            Have an account?{" "}
            <a href="/signUp" className="text-gradientStart ">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
