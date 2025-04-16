import React, { useState, useEffect, useRef } from "react";
import verificationLogo from "./images/VerificationLogo.png";
import { useNavigate } from "react-router-dom";

function Verification({ email, setShowVerification }) {
  const [timer, setTimer] = useState(120); // 2 minutes
  const [code, setCode] = useState(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef([]);
  const navigate = useNavigate();
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

      // بعد التحقق الناجح نروح للداشبورد
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="bg-[#191A30] rounded-3xl shadow-xl text-center p-6 w-lvh h-2/7 border border-[#282939]">
        <div
          className="flex items-center justify-center bg-center mb-6 h-60 w-lg"
          style={{
            background: `url(${verificationLogo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center right 50px",
            backgroundSize: "contain",
          }}
        ></div>
        <h2 className="text-xl font-medium text-35px text-[#FFFFFF] mb-2">
          Enter Verification code
        </h2>
        <p className="text-[#8B44FF] font-medium text-lg mb-4">
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
              className="w-16 h-15 text-center font-light text-lg text-[#FFFFFF] border border-[#282939] rounded-lg mb-7"
              aria-label={`Digit ${idx + 1} of verification code`}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <p className="text-l text-[#FFFFFF] mb-5">
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
            className="w-1/2 py-2 mr-2 border border-[#282939] rounded-lg text-lg text-[#FFFFFF] cursor-pointer  duration-300"
            onClick={() => setShowVerification(false)} // Ensure this function is properly defined
          >
            Cancel
          </button>
          <button
            className="w-1/2 py-2 ml-2 rounded-lg cursor-pointer bg-linear-to-t from-gradientEnd to-gradientStart text-lg text-[#FFFFFF] hover:opacity-75 transition-opacity duration-300 "
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
