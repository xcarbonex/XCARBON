import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import clsx from "clsx";
import { Input, Button } from "@/components";
import { MdOutlineEmail } from "react-icons/md";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import xNeon from "@/assets/xNeon.svg";
import xNeonBlack from "@/assets/xNeonBlack.svg";
import Form from "@/components/Form";
import * as Yup from 'yup';

const Login = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  let parentClasses = clsx(
    theme === "dark" ? "bg-dark-bg" : "bg-light-bg",
    theme
  );
  let logo = theme === "dark" ? xNeon : xNeonBlack;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    setIsLoading(true);
    try {
      // Simulate API call for demo account
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

      const DEMO_EMAIL = "demo@example.com";
      const DEMO_PASSWORD = "Demo@123";

      if (values.email === DEMO_EMAIL && values.password === DEMO_PASSWORD) {
        // Simulate successful login - perhaps store a token in localStorage or context
        console.log("Demo login successful!");
        navigate("/"); // Redirect to the root route
      } else {
        throw new Error("Invalid demo email or password");
      }
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div
      className={clsx(
        "min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover",
        parentClasses
      )}
    >
      <div className="max-w-md w-full space-y-4 bg-secondary border text-tbase p-8 rounded-lg shadow-lg">
        <div className="w-full">
          <img
            src={logo}
            className={clsx("w-fit h-fit mx-auto md:scale-100")}
            alt="xCarbon Logo"
          />
        </div>
        <div>
          <h2 className="mt-1 text-center text-3xl font-extrabold">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm">
            Welcome back! Please enter your details to sign in.
          </p>
        </div>
        <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({ values, handleChange, handleBlur,setFieldValue, errors, touched }) => (
            <div className="mt-8 space-y-4">
              <div className="rounded-md space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium"
                  >
                    Email address
                  </label>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    prefix={<MdOutlineEmail className="h-6 w-6" />}
                    placeholder="Email address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                    suffix={
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        {showPassword ? (
                          <MdVisibilityOff className="h-5 w-5" />
                        ) : (
                          <MdVisibility className="h-5 w-5" />
                        )}
                      </button>
                    }
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
              </div>
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-tbase-600 hover:font-bold"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFieldValue('email', 'demo@example.com');
                    setFieldValue('password', 'Demo@123');
                  }}
                  className="px-3 py-1 border border-tbase-600 rounded-md text-sm font-medium text-tbase-600 hover:bg-tbase-600 transition-colors duration-200"
                >
                  Use Demo Credentials
                </button>
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className={`group relative w-full flex justify-center border border-transparent bg-btn ${
                    isLoading ? "bg-indigo-400" : " hover:bg-btn-500"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
              <div className="text-sm text-center">
                <Link
                  to="/signup"
                  className="font-medium text-tbase-600 hover:font-bold"
                >
                  Don't have an account? Sign up
                </Link>
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Login;
