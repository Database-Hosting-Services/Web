import { useEffect, useState } from "react";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";

import orbixLogo from "../../assets/orbixLogo.png";
import InputGroup from "../../features/auth/components/InputGroup";
import {
  validateEmail,
  validatePassword,
} from "../../features/auth/utils/validators";
import AuthButton from "../../features/auth/components/ui/AuthButton";

const SignIn = () => {
  const navigate = useNavigate();
  const actionData = useActionData();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (actionData?.error?.fields) {
      const newErrors = {
        email: actionData.error.fields.email,
        password: actionData.error.fields.password,
      };

      setErrors(newErrors);
    }
  }, [actionData]);

  const validate = (formData) => {
    const newErrors = {
      email: validateEmail(formData.get("email"))
        ? [validateEmail(formData.get("email"))]
        : null,
      password: validatePassword(formData.get("password"))
        ? [validatePassword(formData.get("password"))]
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
        <Form method="post" onSubmit={handleSubmit}>
          <h2 className="mb-2 font-bold text-text text-2xl">Welcome back !</h2>
          <h3 className="mb-8 font-light text-text text-xs">
            Sign in to your account
          </h3>

          <InputGroup
            label="Email"
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

          <p className="mt-1.5 font-light text-[#682EC7] text-lg text-right">
            <span
              onClick={() => navigate("/forgot-password")}
              className="font-light text-gradientStart text-base cursor-pointer"
            >
              Forget password ?
            </span>
          </p>

          {/* Sign-In Button */}
          <AuthButton>Sign In</AuthButton>

          {/* Sign-up link */}
          <p className="mt-5 text-light text-text text-center">
            Don't have an account ?
            <Link to="/signUp" className="text-gradientStart">
              Sign Up
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
