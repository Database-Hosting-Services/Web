import React from "react";
import cuate from "./images/cuate.png";
function ResetPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      {/* Container / Card */}
      <div className="w-lvh h-2/7 rounded-3xl p-6 sm:p-8 bg-[#191A30]  border border-[#282939]">
        {/* Illustration + Heading */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={cuate}
            alt="Reset Password cuate"
            className="w-48 h-auto mb-6"
          />
          <h1 className="text-2xl mt-6 font-medium text-text mb-2">
            Reset Your Password
          </h1>
          <p className="text-20  text-center mt-4 font-light text-text">
            Enter your email and we’ll send you a link to reset your password
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col items-center">
          <label className="pr-110 text-text text-xl mt-10 mb-2  font-light ">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-[500px] h-[50px]   p-6 mb-1 rounded-3xl bg-secondary text-text border border-tertiary focus:outline-none transition-all duration-300 autofill:text-text [box-shadow:0_0_1000px_1000px#191A30_inset]"
          />
          <button
            type="submit"
            className="w-[500px] h-[50px]   rounded-3xl mt-12 mb-20 bg-linear-to-t from-gradientEnd to-gradientStart opacity-100  text-text font-medium p-2  cursor-pointer text-xl hover:bg-gradientEnd hover:to-highlight/75 transition-opacity-75 duration-300 ease-in-out"
          >
            Reset Your Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
