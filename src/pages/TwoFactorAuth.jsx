import React, { useState, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import clsx from "clsx";
import xNeon from "@/assets/xNeon.svg";
import xNeonBlack from "@/assets/xNeonBlack.svg";
import { Input, Button, Typography } from "@/components";

const TwoFactorAuth = ({ onSubmit, error }) => {
  const { theme } = useTheme();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [submitting, setSubmitting] = useState(false);
  const inputRefs = useRef([]);

  let parentClasses = clsx(
    theme === "dark" ? "bg-dark-bg" : "bg-light-bg",
    theme
  );
  let logo = theme === "dark" ? xNeon : xNeonBlack;

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;
    const newOtp = [...otp];
    newOtp[idx] = value.slice(-1); // Only last digit
    setOtp(newOtp);
    if (value && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("Text").replace(/[^0-9]/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (onSubmit) await onSubmit(otp.join(""));
    setSubmitting(false);
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
          <h2 className="mt-1 text-center text-xl font-semibold">
            Two-Factor Authentication
          </h2>
          <p className="mt-2 text-center text-sm">
            Enter the 6-digit code from your authenticator app.
          </p>
          <p className="mt-1 text-center text-xs text-tbase-500">
            For your security, we require a one-time code from your authenticator app to complete sign in. This helps keep your account safe.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <Input
                key={idx}
                id={`otp-${idx}`}
                name={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={el => inputRefs.current[idx] = el}
                disabled={submitting}
                className="w-12 h-12 text-center text-lg font-mono tracking-widest border rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                style={{ textAlign: 'center' }}
              />
            ))}
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
          <Button
            type="submit"
            disabled={submitting || otp.some(d => d === "")}
            size="lg"
            className={`group relative w-full flex justify-center border border-transparent bg-btn ${
              submitting ? "bg-indigo-400" : " hover:bg-btn-500"
            } focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 !outline-none !focus:outline-none`}
          >
            {submitting ? (
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
            {submitting ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TwoFactorAuth; 