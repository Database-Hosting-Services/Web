import React, { useState, useEffect, useRef } from "react";
import verificationLogo from "../assets/VerificationLogo.png";

function Verification({ email, setShowVerification }) {
  console.log(email);

  const [timer, setTimer] = useState(120); // 2 minutes
  const [code, setCode] = useState(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // allow only digits
    if (!value) return;

    const newCode = [...code];
    newCode[index] = value[0];
    setCode(newCode);

    if (index < 5 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const formatTime = () => {
    const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
    const seconds = String(timer % 60).padStart(2, "0");
    return `${minutes} : ${seconds}`;
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(120);
      // هنا ممكن تضيفي API call لإعادة إرسال الكود
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    setError("");
    try {
      // TODO: Add your verification API call here
      // await verifyCode(verificationCode);
    } catch (err) {
      setError("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 min-h-screen">
      <div className="bg-[#191A30] shadow-xl p-6 border border-[#282939] rounded-3xl w-lvh h-2/7 text-center">
        <div
          className="flex justify-center items-center bg-center mb-6 w-lg h-60"
          style={{
            background: `url(${verificationLogo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center right 50px",
            backgroundSize: "contain",
          }}
        ></div>
        <h2 className="mb-2 font-medium text-[#FFFFFF] text-35px text-xl">
          Enter Verification code
        </h2>
        <p className="mb-4 font-medium text-[#8B44FF] text-lg">
          {formatTime()}
        </p>
        <div
          className="flex justify-around m-2 p-3"
          role="group"
          aria-label="Verification code"
        >
          {code.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[idx] = el)}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="mb-7 border border-[#282939] rounded-lg w-16 h-15 font-light text-[#FFFFFF] text-lg text-center"
              aria-label={`Digit ${idx + 1} of verification code`}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
        </div>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <p className="mb-5 text-[#FFFFFF] text-l">
          Didn't get a code ?{" "}
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className={`text-lg mt-1.5 ${
              timer === 0
                ? "text-[#FFFFFF] hover:underline"
                : "text-[#FFFFFF] cursor-pointer"
            }`}
          >
            click to resend
          </button>
        </p>
        <div className="flex justify-between mb-7 p-6">
          <button
            className="mr-2 py-2 border border-[#282939] rounded-lg w-1/2 text-[#FFFFFF] text-lg duration-300 cursor-pointer"
            onClick={() => setShowVerification(false)} // Ensure this function is properly defined
          >
            Cancel
          </button>
          <button
            className="bg-linear-to-t from-gradientEnd to-gradientStart hover:opacity-75 ml-2 py-2 rounded-lg w-1/2 text-[#FFFFFF] text-lg transition-opacity duration-300 cursor-pointer"
            onClick={handleVerify}
            disabled={isLoading || code.some((digit) => !digit)}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verification;
