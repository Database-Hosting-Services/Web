import { Form, useNavigation } from "react-router-dom";

import cuate from "../../assets/cuate.png";

function ResetPassword() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex justify-center items-center bg-linear-to-tl from-gradientEnd via-black to-highlight min-h-screen">
      {/* Container / Card */}
      <div className="bg-[#191A30] p-6 sm:p-8 border border-[#282939] rounded-3xl w-lvh h-2/7">
        {/* Illustration + Heading */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={cuate}
            alt="Reset Password cuate"
            className="mb-6 w-48 h-auto"
          />
          <h1 className="mt-6 mb-2 font-medium text-text text-2xl">
            Reset Your Password
          </h1>
          <p className="mt-4 font-light text-20 text-text text-center">
            {
              "Enter your email and we'll send you a link to reset your password"
            }
          </p>
        </div>

        {/* Form */}
        <Form method="post" className="flex flex-col items-center">
          <label className="mt-10 mb-2 pr-110 font-light text-text text-xl">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="bg-secondary [box-shadow:0_0_1000px_1000px#191A30_inset] mb-1 p-6 border border-tertiary rounded-3xl focus:outline-none w-[500px] h-[50px] text-text transition-all duration-300"
          />
          <button
            type="submit"
            className="hover:bg-gradientEnd bg-linear-to-t from-gradientEnd to-gradientStart hover:to-highlight/75 opacity-100 mt-12 mb-20 p-2 rounded-3xl w-[500px] h-[50px] font-medium text-text text-xl transition-opacity-75 duration-300 ease-in-out cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Reset Your Password"}
          </button>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
