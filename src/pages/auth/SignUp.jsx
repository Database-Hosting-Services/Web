import { useState } from "react";
import { Form, Link } from "react-router-dom";

import orbixLogo from "../../assets/orbix.svg";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../features/auth/utils/validators";
import InputGroup from "../../features/auth/components/InputGroup";
import AuthButton from "../../features/auth/components/ui/AuthButton";

const SignUp = () => {
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    const newErrors = {
      username: validateUsername(formData.get("username"))
        ? [validateUsername(formData.get("username"))]
        : null,
      email: validateEmail(formData.get("email"))
        ? [validateEmail(formData.get("email"))]
        : null,
      password: validatePassword(formData.get("password"))
        ? [validatePassword(formData.get("password"))]
        : null,
      confirmPassword: validatePassword(formData.get("confirm-password"))
        ? [validatePassword(formData.get("confirm-password"))]
        : null,
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = (e) => {
    if (!validate(new FormData(e.target))) {
      e.preventDefault(); // Block if errors exist
    }
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
        {/* -------------------- Form -------------------- */}
        <Form method="post" onSubmit={handleSubmit}>
          <h2 className="mb-2 font-bold text-text text-2xl">
            Sign up for free
          </h2>
          <h3 className="mb-8 font-light text-text text-xs">
            Let's sign up to get started
          </h3>
          <InputGroup
            label="User Name"
            name="username"
            error={errors.username}
            defaultValue="test_test"
          />
          <InputGroup
            label="Email"
            type="email"
            name="email"
            error={errors.email}
            defaultValue="test@test.com"
          />
          <InputGroup
            type="password"
            label="Password"
            name="password"
            error={errors.password}
            defaultValue="Secret@123"
          />
          <InputGroup
            type="password"
            label="Confirm Password"
            name="confirm-password"
            error={errors.password}
            defaultValue="Secret@123"
          />
          {/* ---------- Sign-Up Button ---------- */}
          <AuthButton>Sign Up</AuthButton>
          {/* ---------- Sign-in link ---------- */}
          <p className="mt-4 text-medium text-text text-center">
            Already have an account?{" "}
            <Link to="/signIn" className="text-gradientStart">
              Sign In
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
