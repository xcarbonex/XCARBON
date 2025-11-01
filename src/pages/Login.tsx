import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import clsx from "clsx";
import { Input, Button, Modal, useToast } from "@/components";
import { MdOutlineEmail } from "react-icons/md";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import xNeon from "@/assets/xNeon.svg";
import xNeonBlack from "@/assets/xNeonBlack.svg";
import Form from "@/components/Form";
import * as Yup from "yup";
import type { FormikValues } from "formik";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Modal state from URL parameters
  const isForgotPasswordOpen = searchParams.get("modal") === "forgot-password";
  const isResetPasswordOpen = searchParams.get("modal") === "reset-password";
  const resetToken = searchParams.get("token") || "";

  let parentClasses = clsx(theme === "dark" ? "bg-dark-bg" : "bg-light-bg", theme);
  let logo = theme === "dark" ? xNeon : xNeonBlack;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const openForgotPasswordModal = () => {
    setSearchParams({ modal: "forgot-password" });
  };

  const closeForgotPasswordModal = () => {
    setSearchParams({});
  };

  const closeResetPasswordModal = () => {
    setSearchParams({});
  };

  const initialValues: LoginFormValues = { email: "", password: "" };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: FormikValues) => {
    const formValues = values as LoginFormValues;
    setError("");
    setIsLoading(true);
    try {
      // Simulate API call for demo account
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

      const DEMO_EMAIL = "demo@example.com";
      const DEMO_PASSWORD = "Demo@123";

      if (formValues.email === DEMO_EMAIL && formValues.password === DEMO_PASSWORD) {
        // Simulate successful login - perhaps store a token in localStorage or context
        // console.log("Demo login successful!");
        localStorage.setItem("authToken", "demo-token-xyz");
        localStorage.setItem("isAuthenticated", "true");

        //   alert('Login successful!');
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch (_err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
          <img src={logo} className={clsx("w-fit h-fit mx-auto md:scale-100")} alt="xCarbon Logo" />
        </div>
        <div>
          <h2 className="mt-1 text-center text-3xl font-extrabold">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm">
            Welcome back! Please enter your details to sign in.
          </p>
        </div>
        <Form
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleBlur, setFieldValue, errors, touched }) => (
            <div className="mt-8 space-y-4">
              <div className="rounded-md space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email-address" className="block text-sm font-medium">
                    Email address
                  </label>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    prefix={<MdOutlineEmail className="h-6 w-6 dark:text-white text-gray-400" />}
                    placeholder="Email address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-sm mt-1">{String(errors.email)}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">
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
                    <p className="text-red-500 text-sm mt-1">{String(errors.password)}</p>
                  )}
                </div>
              </div>
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={openForgotPasswordModal}
                    className="font-medium text-tbase-600 hover:font-bold"
                  >
                    Forgot your password?
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFieldValue("email", "demo@example.com");
                    setFieldValue("password", "Demo@123");
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
                <Link to="/signup" className="font-medium text-tbase-600 hover:font-bold">
                  Don't have an account? Sign up
                </Link>
              </div>
            </div>
          )}
        </Form>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={closeForgotPasswordModal}
        onSuccess={() => {
          toast.success("Reset Link Sent", "Check your email for password reset instructions.");
          closeForgotPasswordModal();
        }}
      />

      {/* Reset Password Modal */}
      <ResetPasswordModal
        isOpen={isResetPasswordOpen}
        onClose={closeResetPasswordModal}
        token={resetToken}
        onSuccess={() => {
          toast.success("Password Reset", "Your password has been successfully reset!");
          closeResetPasswordModal();
        }}
      />
    </div>
  );
};

// ForgotPasswordModal Component
interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement your password reset request logic here
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated API call
      onSuccess();
      setEmail(""); // Reset form
    } catch (_err) {
      setError("Failed to process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setError("");
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Forgot Password" size="sm">
      <div className="space-y-4">
        <p className="text-sm text-secondary">
          Enter your email address and we'll send you instructions to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="forgot-email" className="block text-sm font-medium text-primary">
              Email address
            </label>
            <Input
              id="forgot-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              prefix={<MdOutlineEmail className="h-6 w-6" />}
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="rounded-md bg-error-50 border border-error-200 p-4">
              <p className="text-sm font-medium text-error-800">{error}</p>
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                  Sending...
                </>
              ) : (
                "Send Reset Instructions"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

// ResetPasswordModal Component
interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  onSuccess: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  onClose,
  token,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validatePassword = (password: string): string => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) return "Password must be at least 8 characters long";
    if (!hasUpperCase) return "Password must contain at least one uppercase letter";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter";
    if (!hasNumbers) return "Password must contain at least one number";
    if (!hasSpecialChar) return "Password must contain at least one special character";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or expired reset token");
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement your password reset logic here
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSuccess();
      setFormData({ password: "", confirmPassword: "" }); // Reset form
    } catch (_err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setFormData({ password: "", confirmPassword: "" });
      setError("");
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reset Your Password" size="sm">
      <div className="space-y-4">
        <p className="text-sm text-secondary">Please enter your new password below</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="reset-password" className="block text-sm font-medium text-primary">
              New Password
            </label>
            <Input
              id="reset-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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
          </div>

          <div className="space-y-2">
            <label
              htmlFor="reset-confirm-password"
              className="block text-sm font-medium text-primary"
            >
              Confirm New Password
            </label>
            <Input
              id="reset-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <MdVisibilityOff className="h-5 w-5" />
                  ) : (
                    <MdVisibility className="h-5 w-5" />
                  )}
                </button>
              }
            />
          </div>

          {error && (
            <div className="rounded-md bg-error-50 border border-error-200 p-4">
              <p className="text-sm font-medium text-error-800">{error}</p>
            </div>
          )}

          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800 p-3 border border-neutral-200 dark:border-neutral-700">
            <p className="text-xs text-secondary font-medium mb-2">Password must:</p>
            <ul className="list-disc list-inside text-xs text-tertinary space-y-1">
              <li>Be at least 8 characters long</li>
              <li>Contain at least one uppercase letter</li>
              <li>Contain at least one lowercase letter</li>
              <li>Contain at least one number</li>
              <li>Contain at least one special character</li>
            </ul>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Login;
